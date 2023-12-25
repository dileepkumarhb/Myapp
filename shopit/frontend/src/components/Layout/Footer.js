 import React from 'react'
import { Link } from 'react-router-dom'

// import "../styles/footer.css"

const Footer = () => {
 
  return (
    <div className='f-container'>
        <div className="f-row">
          <hr/>
          <div className="f-col">
            <img src="/images/logo/logo.png" alt="" />
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi, nesciunt! Ipsum repellat saepe, similique magnam aut ducimus eveniet nobis ut sunt neque harum consequatur.</p>
          </div>
          <div className="f-col">
            <h2>Quick Links</h2>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/shop">Shop</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div className="f-col">
            <h2>Category</h2>
            <ul>
              <li>
                <Link to="/">Men</Link>
              </li>
              <li>
                <Link to="/">Women</Link>
              </li>
              <li>
                <Link to="/">Kids</Link>
              </li>
            </ul>
          </div>
          <div className="f-col">
            <h2>Stay in touch with us</h2>
            <div className="socials">
                <Link href="/"><img src="/images/socials/facebook.png" alt="" /></Link>
                <Link href="/"><img src="/images/socials/instagram.png" alt="" /></Link>
                <Link href="/"><img src="/images/socials/twitter.png" alt="" /></Link>
                <Link href="/"><img src="/images/socials/youtube.png" alt="" /></Link>
            </div>
          </div>
        </div>
        <div className="f-copyrow">
            <p>&copy; 2022. All Rights Reserved. Powered by Miljan Peric.</p>
        </div>
    </div>
  )
}
// export default EnhancedFooter;
export default Footer