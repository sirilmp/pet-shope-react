import React from 'react'
import Aos from "aos";
import "aos/dist/aos.css"
Aos.init({ once: true})

function AnimatedWhiteDog2() {
    return (
        <div className='white_animated_dog_2'
        data-aos="fade-left"
        data-aos-duration="3000"
        >
            <div className="animated-dog-run">
      <div className="dog">
        <div className="dog-body">
          <div className="dog-tail">
            <div className="dog-tail">
              <div className="dog-tail">
                <div className="dog-tail">
                  <div className="dog-tail">
                    <div className="dog-tail">
                      <div className="dog-tail">
                        <div className="dog-tail">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="dog-torso"></div>
        <div className="dog-head">
          <div className="dog-ears">
            <div className="dog-ear"></div>
            <div className="dog-ear"></div>
          </div>
          <div className="dog-eyes">
            <div className="dog-eye"></div>
            <div className="dog-eye"></div>
          </div>
          <div className="dog-muzzle">
            <div className="dog-tongue"></div>
          </div>
        </div>
      </div>
    </div>
        </div>
    )
}

export default AnimatedWhiteDog2
