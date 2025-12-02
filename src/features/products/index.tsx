import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './../../store';
import { fetchProducts } from './productSlice';
import { ConfigDrawer } from './../../components/config-drawer';
import { Header } from './../../components/layout/header';
import { Main } from './../../components/layout/main';
import { ProfileDropdown } from './../../components/profile-dropdown';
import { Search } from './../../components/search';
import { ThemeSwitch } from './../../components/theme-switch';
import { ProductsTable } from './components/productTable/product-table';

export function Products() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: products, loading, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <Header fixed>
        <Search />
        <div className="ms-auto flex items-center space-x-4">
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      <Main className="flex flex-1 flex-col gap-4 sm:gap-6">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Products</h2>
            <p className="text-muted-foreground">
              List of your products!
            </p>
          </div>
        </div>

        {loading && <p>Loading products...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {!loading && !error && <ProductsTable data={products} />}
      </Main>
    </>

  );
}
