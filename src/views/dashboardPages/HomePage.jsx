import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

import Header from "../../components/shared/Header";
import Footer from "../../components/shared/Footer";
// import "./index.css";

import videoUrl from "../../assets/images/video.mp4";

import { serverUnauth } from "../../helpers/apiCall";

import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const navigate = useNavigate();
  const myRef = useRef(null);
  useEffect(() => {
    gsap.from(myRef.current, {
      duration: 1,
      ease: "power2.out",
      opacity: 0,
      y: "-30%",
    });
  }, []);

  return (
    <div>
      <Header />

      <body>
        <div class="hero">
          <div className="video-overlay">
            <video autoplay loop muted plays-inline class="back-video">
              <source src={videoUrl} type="video/mp4" />
            </video>
          </div>
          <div class="content">
            <h1>NIT ALLAHABAD</h1>
            <a class="explore" href="http://www.mnnit.ac.in/">
              EXPLORE
            </a>
          </div>
        </div>

        <h2 class="intro">ABOUT!</h2>
        <p class="text">
          HEY THERE, If you are worried about how to explore your college, which
          club or society will suit you and in various clubs which type of
          project you will do. So you are at the right place, here you can get
          all news about the hiring and recruitment process of our various
          societies and clubs.Here you can get many more things about your
          college......
        </p>

        <div class="bg bg1">
          <h2 class="desc">CLUBS</h2>
        </div>
        <p class="text">
          Clubs at a college are attuned to help students get most out of their
          experience while they are enrolled at the college for their academic
          pursuits. These student clubs offer limitless opportunities for
          student leadership and participation beyond classroom setup and
          academic programme.
          <br />
          Clubs provide a great platform to usher-in the distinctive
          perspectives and life experiences that all students bring to the
          college. They indeed help in students’ transformation and holistic
          development in a big way. So it is that these clubs are especially
          aimed at helping students to get involved and find their own niche on
          their college campus.
        </p>

        <div class="bg bg2">
          <h2 class="desc">SOCIETIES</h2>
        </div>
        <p class="text">
          If you really want to experience college life, you should plan to make
          the most of your free time when you are not attending any lectures and
          classes. The activity-packed student lifestyle means that finding
          student organizations to match your interests is not likely to be
          difficult.
          <br />
          Each college has its own selection of organizations which are operated
          by current students or alumni. Their activities may be based on the
          major fields of study at the institution, while many societies focus
          on particular interests of students. Take the chance to join or form
          student organizations that cover your interests, and explore
          opportunities to network, share and develop leadership skills.
        </p>

        <div class="bg bg3">
          <h2 class="desc">SPORTS</h2>
        </div>
        <p class="text">
          Do sports have any significance in a student’s life or they simply
          divert them from studies? Can regular participation in sports and
          games garner success in academics? These are some of the questions
          that haunt every student and their parents.
          <br />
          In college, sports play a key role in moulding the students. These
          give mental relaxation to the students from their hectic schedule.
          Furthermore, sports develop students into well-balanced individuals.
          Apart from that, there are many reasons that stress on sports:
        </p>

        <div class="bg bg4">
          <h2 class="desc">HOSTELS</h2>
        </div>
        <p class="text">
          As we all know about our hostelS like Swami Vivekanad Boys Hostel,P.D.
          Tandon Hostel,M.M. Malviya Hostel,Bal Gangadhar Tilak Hostel,R.N.
          Tagore Hostel,C.V. Raman Hostel,Sardar Vallabh Bhai Patel Hostel,K.N.
          Girls Hostel,P.G. Boys Hostel and P.G. Girls Hostel.
          <br />
          So you are a hosteller,You better know about the problems that all the
          hostellers have to face (mainly in boys hostels) and also know about
          how much time a problem will take to be resolve.So here you will get a
          better experience of resolving problems and hostel related stuff...
        </p>

        <div class="bg bg5">
          <h2 class="desc">CANTEENS</h2>
        </div>
        <p class="text">
          Woaah!!! , there is no one in our college who doesn't know about the
          canteens of our college.Even I have to mention them here --Yamuna
          canteen,Pillai canteen,Teerathnaath canteen,CHAI
          Wallah,specially-Talwar uncle ki canteen.
          <br />
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio
          quae, quas quibusdam assumenda quod consectetur exercitationem harum!
          Ullam autem nemo error ut consequuntur facilis. Maxime, consequuntur!
          Ad eveniet, amet optio labore quo earum fugiat similique, officiis
          assumenda sapiente commodi sequi id mollitia nesciunt necessitatibus
          maxime.
        </p>

        <footer>
          <div class="footer-content">
            <h3>About Us</h3>
            <p>
              "You can get everything in life you want if you will just help
              enough other people get what they want.”
            </p>
            <ul class="socials">
              <li class="i1">
                <a href="#">
                  <i class="fab fa-instagram"></i>
                </a>
              </li>
              <li class="i2">
                <a href="#">
                  <i class="fab fa-facebook"></i>
                </a>
              </li>
              <li class="i3">
                <a href="#">
                  <i class="fab fa-google-plus"></i>
                </a>
              </li>
              <li class="i4">
                <a href="#">
                  <i class="fab fa-linkedin"></i>
                </a>
              </li>
              <li class="i4">
                <a href="#">
                  <i class="fab fa-email"></i>
                </a>
              </li>
            </ul>
          </div>
          <div class="footer-bottom"></div>
          <p>
            copyright &copy;2023 codeOpacity. designed by{" "}
            <span>Aditya Dixit</span>{" "}
          </p>
        </footer>

        <div class="modal">
          <div class="modal-header">
            <h2>My Profile</h2>
            <div>
              <i onclick="closeModal()" class="fa-solid fa-xmark close"></i>
            </div>
          </div>

          <div>
            <div class="icon-container">
              <a href="#" class="icon" id="facebook">
                <i class="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" class="icon" id="twitter">
                <i class="fa-brands fa-twitter"></i>
              </a>
              <a href="#" class="icon" id="instagram">
                <i class="fa-brands fa-instagram"></i>
              </a>
              <a href="#" class="icon" id="whatsapp">
                <i class="fa-brands fa-whatsapp"></i>
              </a>
              <a href="#" class="icon" id="telegram">
                <i class="fa-brands fa-telegram"></i>
              </a>
            </div>
          </div>
        </div>
      </body>
      <Footer />
    </div>
  );
};

export default HomePage;
