const MS_PER_SECOND = 1000.0;
const OLD_EVENT_TIME = 2.0;

export default class Scheduler {

  constructor(audioEngine){
    // reference to audio engine needed
    // because scheduler uses it as a timing
    // reference
    this.audioEngine = audioEngine;
    this.running = false;
    this.currentBeat = 0;
    this.tempo = 120;
    this.startTime = 0.0;

    /**
     * Events have format
     * {
     *    atBeat: int,  // beat at which to trigger
     *    f: function   // function for the event
     *    id: int       // the event id
     * }
     */
    this.events = [];

    this.nextId = 1;
  }

  /**
   * starts the scheduler
   */
  start(){
    this.running = true;
    this.startTime = this.getEngineTime();

    let loop = ()=>{
      this.currentBeat = this.getCurrentBeat()
      this.consumeEventsTo(this.currentBeat+1);

      if (this.running){
        // schedule 8 times per beat
        setTimeout(loop, MS_PER_SECOND*(this.lengthOfBeat()/8.0));
      }
    }
    loop();
  }

  /**
   * Get the time from the audio engine
   */
  getEngineTime(){
    return this.audioEngine.audioContext.currentTime;
  }

  /**
   * gets the current beat 
   * calculated from the start time and the current time
   */
  getCurrentBeat(){
    const currentTime = this.getEngineTime();
    const ellapsedTime = currentTime - this.startTime;
    return ellapsedTime / this.lengthOfBeat();
  }

  /**
   * Consume events up to the beat given in the argument. 
   * Reschedules events that return a value.
   * Call event functions with parameters:
   *    (beat (int) - the beat)
   *    (time (float) - engine time of selected beat)
   * 
   * @param {float} beat the beat to which to clear
   */
  consumeEventsTo(beat){
    // we define the previous beat to be beat minus one
    // but add a modifier to clean up old events
    const previousBeat = beat - (1 + OLD_EVENT_TIME);
    const eligibleEvents = this.eventsBetweenBeats(previousBeat, beat)

    eligibleEvents.forEach(event=> this.consumeEvent(event));

    // filter out expired events
    this.events = this.events.filter((event)=>{
      return eligibleEvents.indexOf(event) == -1;
    })
  }

  /**
   * Consume event by calling its function, then rescheduling it if 
   * and integer value is passed from it. 
   * 
   * @param {Object} event - object representing the event
   */
  consumeEvent(event){
    const scheduleTime = this.beatToTime(event.atBeat);
    // call the function, return the time to schedule next
    const atBeat = event.f(event.atBeat, scheduleTime);

    if (atBeat){ // discard events that return 0 or nothing
      this.events.push({
        f: event.f,
        atBeat: event.atBeat + atBeat,
        id: event.id // we reuse id in order to cancel
      })
    }
  }

  /**
   * Converts the beat at which an event is to trigger
   * into the precise time at which the event is to trigger
   * 
   * @param {float} beat 
   */
  beatToTime(beat){
    return this.startTime + beat * this.lengthOfBeat();
  }

  /**
   * Returns all events between begin and end, inclusive
   * on end, exclusive on begin.
   * 
   * @param {float} begin - start beat
   * @param {float} end - end beat
   */
  eventsBetweenBeats(begin, end){
    return this.events.filter(event=>{
      return event.atBeat > begin && event.atBeat <= end;
    });
  }

  /**
   * returns the length of the current beat in seconds
   */
  lengthOfBeat(){
    return 60.0/this.tempo;
  }

  /**
   * stops the scheduler, which includes reseting the beat
   * and clearing all subscriptions
   */
  stop(){
    this.running = false;
    this.currentBeat = 0;
    this.events = [];
  }

  /**
   * Set the tempo of the scheduler
   * @param {float} tempo 
   */
  setTempo(tempo){
    this.tempo = tempo;

    // we have to adjust the start time
    // in order for the number of ellapsed beats to remain
    // innaccurate, because the current beat is calculated
    // from the start time
    if (this.running){
      const currentTime = this.getEngineTime();
      // the ellapsed time at the new tempo
      const ellapsedTime = this.currentBeat * this.lengthOfBeat();
      this.startTime = currentTime - ellapsedTime;
    }
  }

  /**
   * 
   * @param {Function} f 
   * @param {float} atBeat - (default: 0) 
   *  How many beats after the next at which to schedule. 
   *  for example, if the scheduler is at the first half of a beat, and atBeat
   *  is 1, schedule at the beat after next. Default is 0, for scheduling at the
   *  next beat.
   */
  schedule(f, atBeat){
    atBeat = atBeat || 0;
    this.events.push({
      atBeat: Math.ceil(this.currentBeat)+atBeat,
      f: f, 
      id: this.nextId++
    });
  }

  /**
   * Calls a function every n beats
   * 
   * @param f function to schedule
   * @param everyNBeats number of beats which to call function
   * @param atBeat first beat to start scheduling
   */
  scheduleRecurring(f, everyNBeats, atBeat){
    const cb = function(beat, time){
      f(beat, time);
      return everyNBeats;
    }

    return this.schedule(cb);
  }

  /**
   * Unschedules event with {id}
   * 
   * @param {int} id 
   */
  unschedule(id){
    this.events = events.filter(event=>{
      return event.id != id;
    });
  }

};