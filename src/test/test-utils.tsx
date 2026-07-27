import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

// Импортируем ТОЛЬКО типы с ключевым словом 'type'
import type { PropsWithChildren } from 'react';
import type { RenderOptions } from '@testing-library/react';

// Создаём простой тестовый store без API
export function createTestStore() {
  return configureStore({
    reducer: {},
  });
}

export type TestStore = ReturnType<typeof createTestStore>;

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  store?: TestStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  { store = createTestStore(), ...renderOptions }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>) {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}