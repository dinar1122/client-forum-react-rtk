import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../app/store';
import { Login } from './Login';
import '@testing-library/jest-dom/extend-expect';

// Mock for useLoginMutation
jest.mock('../app/services/userApi', () => ({
  useLoginMutation: () => [
    jest.fn(() => Promise.resolve({ data: {} })),
    { isLoading: false }
  ],
  useLazyCurrentQuery: () => [jest.fn()]
}));

describe('Login Component', () => {
  const setSelectedMock = jest.fn();

  it('should render login form', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login setSelected={setSelectedMock} />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Пароль/i)).toBeInTheDocument();
    expect(screen.getByText(/Войти/i)).toBeInTheDocument();
  });
  it('should display validation errors', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login setSelected={setSelectedMock} />
        </BrowserRouter>
      </Provider>
    );
    fireEvent.submit(screen.getByRole('button', { name: /Войти/i }));

    await waitFor(() => {
      expect(screen.getByText(/Обязательное поле/i)).toBeInTheDocument();
    });
  });

  it('should submit form data successfully', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login setSelected={setSelectedMock} />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'newemail@mail.ru' }
    });
    fireEvent.change(screen.getByLabelText(/Пароль/i), {
      target: { value: 'pass123' }
    });

    fireEvent.submit(screen.getByRole('button', { name: /Войти/i }));

    await waitFor(() => {
      expect(screen.queryByText(/Обязательное поле/i)).not.toBeInTheDocument();
    });
  });
});
