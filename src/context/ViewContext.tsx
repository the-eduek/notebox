import { createContext } from 'react';
import { ViewType } from '../types';

export const ViewContext = createContext<ViewType>('list');