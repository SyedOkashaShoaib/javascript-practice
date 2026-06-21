export {degreeToRadian as deg2rad}  from './stats.js';
export {Circle} from './stats.js';
export {default as Bitset} from './stats.js';
export {mean, stddev} from './stats2.js';

/*Why do this? 
Imagine if we have 100+ modules. For the dev to remember where every single export comes from 
is going to be difficult. So what we do, is that we create a single point of export, and import 
all our required exports from that file.  */