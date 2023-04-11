import { Header, Footer } from "../components_index";
// import Books from '../books';
function DefaultLayout({ children }) {
      return (
      <>
              <Header/>
              <div className='DefaultLayout--content'>
              {children}
              </div>
              <Footer />
      </>
       );

}

export default DefaultLayout;