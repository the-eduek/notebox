import { createContext } from 'react';
import { ViewType } from '../types';

const ViewContext = createContext<ViewType>('list');
export default ViewContext;