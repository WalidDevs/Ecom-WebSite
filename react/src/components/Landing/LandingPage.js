import Nav from './Nav'
import Hero from './Hero'
import Footer from './Footer'
import Ibutton from './Ibutton'
import About from './About'
import Services from './Services'
import Products from './Products'

function LandingPage() {
    return (
        <div className="App">
            <Nav />
            <Hero />
            <Ibutton></Ibutton>
            <Products/>
            <About/>
            <Services/>
            <Footer />
        </div>
    );
}

export default LandingPage;