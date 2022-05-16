import React from 'react';
import '@sass/components/interes-box.scss';
import PageHead from '@/ui/components/PageHead';
import Button from '@/ui/Shared/Button/Button';

const InterestBox = (props) => {

  return <div className='interes-box interes-box--wrap'>
    <div className="interes-box--bg">
      <img src={props.bg ?? 'https://images6.alphacoders.com/992/992033.jpg'} alt="" />
    </div>
    <div className="interes-box--content">
      <div className="interes-box--head">
        <div className="interes-box--icon"></div>
        <div className="interes-box--title">
          <p>Some title</p>
          <div className="interes-box--desc">
            <p>45.4 followers</p>
          </div>
        </div>

      </div>
      {/* <div className="interes-box--body">
        <ul className="widget-list">
          <li><p>some title</p></li>
          <li><p>some title</p></li>
          <li><p>some title</p></li>
          <li><p>some title</p></li>
          <li><p>some title</p></li>
          <li><p>some title</p></li>
          <li><p>some title</p></li>
          <li><p>some title</p></li>
          <li><p>some title</p></li>
        </ul>
      </div> */}
    </div>
  </div>
}

export default function Interests() {
  return (
    <div className="container-outer">
      <div className='container-xl'>
        <div className="section">
          <PageHead>
            <PageHead.Left>
              <PageHead.Title>Interest areal</PageHead.Title>
            </PageHead.Left>
            <PageHead.Right>
              <Button size='normal' variant='secondary' text='Add New' />
            </PageHead.Right>
          </PageHead>
          <div className="row">
            <div className="col-sm-6 col-md-4 col-xl-3">
              <InterestBox bg={'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/kZ4WEkyWG0XJL71PIEpYdbDHOuz.jpg'} />
            </div>
            <div className="col-sm-6 col-md-4 col-xl-3">
              <InterestBox />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
