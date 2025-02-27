import logo from '../../image/logo.png'
import './footer.css'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
export const Footer = () => {
  return (
    <div className="footer-container">
       <div className="top-footer">
        <div className="img">
          <img src={logo} alt="School Logo" />
          <h3 className='img-text'>ATUNRASHE HIGH SCHOOL</h3>
          
        </div>
        <div className="contacts">
          <div>
            <h3 className="div-header">Content</h3>
            <ul>
              <li>Home</li>
              <li>About Us</li>
              <li>Admission</li>
              <li>Academics</li>
              <li>Sports</li>
              <li>Event & News</li>
            </ul>
          </div>
          <div>
            <h3 className="div-header">
             Contact
            </h3>
            <ul>
              <li>Adress: 30 ATUNRASHE HIGH SCHOOL Lagos Nigeria </li>
              <li>Phone Number: +23470234567</li>
              <li>E-mail: ATUNRASHE HIGH SCHOOL@gmail.com</li>
            </ul>
          </div>
          <div>
            <h3 className="div-header">Important Notice & School News</h3>
            <ul>
              <li>Exam Schedule Released: The final examination schedule for this term has been published. Students are advised to check the notice board or the school portal for detailed dates and subjects.</li>
              <li>
              Parent-Teacher Meeting: A mandatory parent-teacher meeting is scheduled for March 15th. Attendance is compulsory for all parents.
              </li>
              <li>
              Holiday Announcement: The school will be closed on March 25th in observance of the national holiday. Classes will resume on March 26th.
              </li>
            </ul>
          </div>
        
          
        </div>
       </div>
       <div className="bottom-footer">
       <div>
      <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
        <FaFacebookF />
      </a>
      <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
        <FaTwitter />
      </a>
      <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
        <FaInstagram />
      </a>
      <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
        <FaLinkedinIn />
      </a>
    </div>
       </div>
    </div>
  )
}
