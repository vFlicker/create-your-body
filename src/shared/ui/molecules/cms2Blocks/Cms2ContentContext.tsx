import { createContext, useContext } from 'react';

type Cms2ContentContextValue = {
  productId?: number;
};

export const Cms2ContentContext = createContext<Cms2ContentContextValue>({});

export const useCms2ContentContext = () => useContext(Cms2ContentContext);
