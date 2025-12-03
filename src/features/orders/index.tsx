import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './../../store';
import { ConfigDrawer } from './../../components/config-drawer'
import { Header } from './../../components/layout/header'
import { Main } from './../../components/layout/main'
import { ProfileDropdown } from './../../components/profile-dropdown'
import { Search } from './../../components/search'
import { ThemeSwitch } from './../../components/theme-switch'
import { OrdersTable } from './components/order-table'
import { fetchOrders } from './ordersSlice';

export function Orders() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: orders, loading, error } = useSelector((state: RootState) => state.orders);


  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <>
      <Header fixed>
        <Search />
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div className='flex flex-wrap items-end justify-between gap-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Orders List</h2>
     
          </div>

        </div>
        <OrdersTable data={orders}  />
      </Main>


    </>
  )
}
