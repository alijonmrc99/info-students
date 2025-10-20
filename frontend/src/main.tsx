import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { PaginationProvider } from './common/providers/pagination.provider.tsx';
import { ErrorBoundary } from './common/error/ErrorBoundary.tsx';
import './i18n.ts';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { MenuProvider } from './common/providers/menu.provider.tsx';
import { PlaceModalProvider } from './common/providers/place.provider.tsx';
import { PlaceFilterProvider } from './common/providers/place.filter.provider1.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ConfigProvider theme={{
      token: {
        fontFamily: "Poppins",
      },
      components: {

        Layout: {
          headerBg: 'transparent',
          bodyBg: 'trasnparent',
          headerHeight: 100,
          paddingXS: 0,
          paddingLG: 0
        },
      }
    }} >
      <BrowserRouter>
        <ErrorBoundary>
          <PaginationProvider>
            <MenuProvider>
              <PlaceModalProvider>
                <PlaceFilterProvider >
                <App />
                </PlaceFilterProvider>
              </PlaceModalProvider>
            </MenuProvider>
          </PaginationProvider>
        </ErrorBoundary>
      </BrowserRouter>
    </ConfigProvider>
  </Provider>
)
