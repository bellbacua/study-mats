import metals from './metals';
import electronic from './electronic';
import energy from './energy';
import philo from './philo';
import comp from './comp';
import econ from './econ';
import bio from './bio';

export { TRACKS, YEAR_ENDS, SIDES, SIDES_LATER } from './meta';
export const TRACK_CLASSES = [...metals, ...electronic, ...energy, ...philo, ...bio, ...comp, ...econ];
