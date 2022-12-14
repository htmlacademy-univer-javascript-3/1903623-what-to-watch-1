import Logo from '../../components/logo/logo';
import PromoCard from '../../components/promo-card/promo-card';
import FilmList from '../../components/film-list/film-list';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {useEffect} from 'react';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import {AuthorizationStatus} from '../../const';
import {fetchFavoriteFilmsAction} from '../../store/api-actions';

function MainScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(getAuthorizationStatus);

  useEffect(() => {
    if (authStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavoriteFilmsAction());
    }
  }, [authStatus, dispatch]);

  return (
    <>
      <PromoCard />

      <div className="page-content">
        <FilmList />

        <footer className="page-footer">
          <Logo isLightVersion />
          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default MainScreen;
