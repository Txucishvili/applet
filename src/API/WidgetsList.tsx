import { WIDGETS_KEYS } from "@/modules/Widgets";

interface IWidget {
  id: string | number;
  name: string;
  key: string;
  desc: string;
  avatar: string | any;
}

export const WidgetIcons = {

  Giphy: <svg key="giphy" xmlns="http://www.w3.org/2000/svg" viewBox="4 2 16.32 20"><g fill="none" fillRule="evenodd"><path d="M6.331 4.286H17.99v15.428H6.33z" fill="#000" /><g fillRule="nonzero"><path d="M4 3.714h2.331v16.572H4z" fill="#04ff8e" /><path d="M17.989 8.286h2.331v12h-2.331z" fill="#8e2eff" /><path d="M4 19.714h16.32V22H4z" fill="#00c5ff" /><path d="M4 2h9.326v2.286H4z" fill="#fff152" /><path d="M17.989 6.571V4.286h-2.332V2h-2.331v6.857h6.994V6.571" fill="#ff5b5b" /><path d="M17.989 11.143V8.857h2.331" fill="#551c99" /></g><path d="M13.326 2v2.286h-2.332" fill="#999131" /></g></svg>,
  '9GAG': <svg key="9GAG" width="60px" height="60px" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><rect fill="#fff" height="60" rx="10" width="60" /><path d="M30,6.91,10,18.45v4L30,34l12-6.93V37.26L30,44.19,17.72,37.1,10,41.55,30,53.09l12-6.92,8-4.62V18.45Zm0,17.278-7.091-4.094L30,16l7.091,4.094Z" fill="#f1f3f4" /><path d="M30,54.59a1.5,1.5,0,0,1-.75-.2l-20-11.54a1.5,1.5,0,0,1,0-2.6L16.97,35.8a1.5,1.5,0,0,1,1.5,0L30,42.458l10.5-6.064V29.668L30.75,35.3a1.5,1.5,0,0,1-1.5,0l-20-11.55a1.5,1.5,0,0,1-.75-1.3v-4a1.5,1.5,0,0,1,.75-1.3l20-11.54a1.5,1.5,0,0,1,1.5,0l20,11.54a1.5,1.5,0,0,1,.75,1.3v23.1a1.5,1.5,0,0,1-.75,1.3l-20,11.54A1.5,1.5,0,0,1,30,54.59ZM13,41.55l17,9.808L48.5,40.684V19.316L30,8.642,11.5,19.316v2.268L30,32.268l11.25-6.5a1.5,1.5,0,0,1,2.25,1.3V37.26a1.5,1.5,0,0,1-.75,1.3l-12,6.93a1.5,1.5,0,0,1-1.5,0L17.719,38.83ZM30,25.688a1.5,1.5,0,0,1-.75-.2l-7.091-4.094a1.5,1.5,0,0,1,0-2.6L29.25,14.7a1.5,1.5,0,0,1,1.5,0L37.841,18.8a1.5,1.5,0,0,1,0,2.6L30.75,25.487A1.5,1.5,0,0,1,30,25.688Zm-4.091-5.594L30,22.456l4.091-2.362L30,17.732Z" fill="#7f778c" /><path d="M50,19.951a1.5,1.5,0,0,1-.749-.2L30,8.642,10.75,19.75a1.5,1.5,0,0,1-1.5-2.6l20-11.54a1.5,1.5,0,0,1,1.5,0l20,11.54a1.5,1.5,0,0,1-.751,2.8Z" fill="#aaadbf" /></svg>,
  Dribble: <svg key="Dribble" width="256px" height="256px" viewBox="0 0 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
    <g>
      <path d="M128,8.5 C194,8.5 247.4,61.9 247.4,127.8 C247.4,193.7 194,247.2 128,247.2 C62,247.2 8.6,193.8 8.6,127.9 C8.6,62 62,8.5 128,8.5 L128,8.5 L128,8.5 Z" fill="#E74D89"></path>
      <path d="M128,255.7 C57.4,255.7 0,198.4 0,127.9 C0,57.3 57.4,0 128,0 C198.6,0 256,57.3 256,127.8 C256,198.3 198.6,255.7 128,255.7 L128,255.7 L128,255.7 Z M235.9,145.3 C232.2,144.1 202.1,135.2 167.8,140.6 C182.1,179.8 187.9,211.8 189,218.4 C213.6,201.9 231.1,175.7 235.9,145.3 L235.9,145.3 L235.9,145.3 Z M170.7,228.5 C169.1,218.9 162.7,185.5 147.4,145.7 C147.2,145.8 146.9,145.9 146.7,145.9 C85,167.4 62.9,210.1 60.9,214.1 C79.4,228.5 102.7,237.1 128,237.1 C143.1,237.2 157.6,234.1 170.7,228.5 L170.7,228.5 L170.7,228.5 Z M46.8,201 C49.3,196.8 79.3,147.2 135.7,128.9 C137.1,128.4 138.6,128 140,127.6 C137.3,121.4 134.3,115.2 131.1,109.1 C76.5,125.4 23.5,124.7 18.7,124.6 C18.7,125.7 18.6,126.8 18.6,127.9 C18.7,156 29.3,181.6 46.8,201 L46.8,201 L46.8,201 Z M21,105.6 C25.9,105.7 70.9,105.9 122.1,92.3 C104,60.1 84.4,33.1 81.6,29.2 C50.9,43.6 28.1,71.8 21,105.6 L21,105.6 L21,105.6 Z M102.4,21.8 C105.4,25.8 125.3,52.8 143.2,85.7 C182.1,71.1 198.5,49.1 200.5,46.3 C181.2,29.2 155.8,18.8 128,18.8 C119.2,18.8 110.6,19.9 102.4,21.8 L102.4,21.8 L102.4,21.8 Z M212.6,58.9 C210.3,62 192,85.5 151.6,102 C154.1,107.2 156.6,112.5 158.9,117.8 C159.7,119.7 160.5,121.6 161.3,123.4 C197.7,118.8 233.8,126.2 237.4,126.9 C237.1,101.2 227.9,77.5 212.6,58.9 L212.6,58.9 L212.6,58.9 Z" fill="#B2215A"></path>
    </g>
  </svg>,
  Unsplash: <svg key="Unsplash" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg"><title>Unsplash icon</title><path fill="#FFF" d="M7.5 6.75V0h9v6.75h-9zm9 3.75H24V24H0V10.5h7.5v6.75h9V10.5z" /></svg>,
  Medium: <svg key="medium" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
    viewBox="0 0 393.541 393.541" style={{ background: 'enable-background:new 0 0 393.541 393.541' }}>
    <g>
      <path fill="#00FD8D" d="M384.045,363.079L262.84,304.812L261.927,40.68c-0.021-6.166,6.416-10.229,11.973-7.557
     l114.908,55.256c2.893,1.391,4.733,4.318,4.733,7.528v261.201C393.54,361.989,388.443,365.194,384.045,363.079z"/>
      <path fill="#00E470" d="M262.84,304.812L131.66,241.74L257.948,33.818c2.231-3.673,6.886-5.054,10.759-3.192l116.514,56.029
     c4.454,2.142,6.085,7.661,3.51,11.879L262.84,304.812z"/>
      <path fill="#00C967" d="M262.84,304.812L131.66,241.74L11.421,45.942c-3.35-5.455,2.479-11.914,8.248-9.14L131.66,90.655
     L262.84,304.812z"/>
      <path fill="#00AD6C" d="M122.164,363.078l-118.41-56.94C1.459,305.034,0,302.713,0,300.167V37.548
     c0-4.726,4.937-7.831,9.197-5.782L131.66,90.655v266.452C131.66,361.988,126.562,365.193,122.164,363.078z"/>
    </g>
  </svg>,
  Pinterest: <svg key="pinterest" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="#BD081C" fillRule="evenodd" d="M12,0 C5.37225,0 0,5.37225 0,12 C0,17.0835 3.16275,21.426 7.62675,23.17425 C7.52175,22.22475 7.42725,20.76825 7.66875,19.73175 C7.88625,18.79575 9.07575,13.767 9.07575,13.767 C9.07575,13.767 8.7165,13.0485 8.7165,11.98575 C8.7165,10.317 9.684,9.07125 10.88775,9.07125 C11.9115,9.07125 12.4065,9.84 12.4065,10.76175 C12.4065,11.7915 11.751,13.3305 11.41275,14.757 C11.13,15.95175 12.01125,16.926 13.1895,16.926 C15.3225,16.926 16.962,14.67675 16.962,11.43075 C16.962,8.5575 14.89725,6.54825 11.949,6.54825 C8.535,6.54825 6.531,9.1095 6.531,11.75625 C6.531,12.7875 6.92775,13.89375 7.4235,14.4945 C7.52175,14.61375 7.536,14.71725 7.50675,14.83875 C7.416,15.21825 7.2135,16.03275 7.17375,16.2 C7.12125,16.419 6.99975,16.46625 6.7725,16.3605 C5.27325,15.66225 4.3365,13.4715 4.3365,11.71125 C4.3365,7.926 7.08675,4.44975 12.2655,4.44975 C16.428,4.44975 19.6635,7.416 19.6635,11.3805 C19.6635,15.516 17.05575,18.8445 13.43625,18.8445 C12.2205,18.8445 11.0775,18.21225 10.686,17.466 C10.686,17.466 10.0845,19.75725 9.93825,20.319 C9.6675,21.36075 8.93625,22.66725 8.4465,23.4645 C9.57,23.8125 10.76325,24 12,24 C18.62775,24 24,18.627 24,12 C24,5.37225 18.62775,0 12,0" />
  </svg>,
  Reddit: <svg key="reddit" xmlns="http://www.w3.org/2000/svg"
    aria-label="Reddit" role="img"
    viewBox="0 0 512 512"><rect
      width="512" height="512"
      rx="15%"
      fill="#f40" /><g fill="#fff"><ellipse cx="256" cy="307" rx="166" ry="117" /><circle cx="106" cy="256" r="42" /><circle cx="407" cy="256" r="42" /><circle cx="375" cy="114" r="32" /></g><g strokeLinecap="round" strokeLinejoin="round" fill="none"><path d="m256 196 23-101 73 15" stroke="#fff" strokeWidth="16" /><path d="m191 359c33 25 97 26 130 0" stroke="#f40" strokeWidth="13" /></g><g fill="#f40"><circle cx="191" cy="287" r="31" /><circle cx="321" cy="287" r="31" /></g></svg>
}

// local 
export const InitialWidgetList: IWidget[] = [
  {
    id: 1,
    name: 'Giphy',
    key: WIDGETS_KEYS.Giphy,
    desc: 'giphy',
    avatar: <svg key="giphy" xmlns="http://www.w3.org/2000/svg" viewBox="4 2 16.32 20"><g fill="none" fillRule="evenodd"><path d="M6.331 4.286H17.99v15.428H6.33z" fill="#000" /><g fillRule="nonzero"><path d="M4 3.714h2.331v16.572H4z" fill="#04ff8e" /><path d="M17.989 8.286h2.331v12h-2.331z" fill="#8e2eff" /><path d="M4 19.714h16.32V22H4z" fill="#00c5ff" /><path d="M4 2h9.326v2.286H4z" fill="#fff152" /><path d="M17.989 6.571V4.286h-2.332V2h-2.331v6.857h6.994V6.571" fill="#ff5b5b" /><path d="M17.989 11.143V8.857h2.331" fill="#551c99" /></g><path d="M13.326 2v2.286h-2.332" fill="#999131" /></g></svg>
  },
  {
    id: 2,
    name: '9GAG',
    key: WIDGETS_KEYS.nGAG,
    desc: '9GAG',
    avatar: <svg key="9GAG" width="60px" height="60px" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><rect fill="#fff" height="60" rx="10" width="60" /><path d="M30,6.91,10,18.45v4L30,34l12-6.93V37.26L30,44.19,17.72,37.1,10,41.55,30,53.09l12-6.92,8-4.62V18.45Zm0,17.278-7.091-4.094L30,16l7.091,4.094Z" fill="#f1f3f4" /><path d="M30,54.59a1.5,1.5,0,0,1-.75-.2l-20-11.54a1.5,1.5,0,0,1,0-2.6L16.97,35.8a1.5,1.5,0,0,1,1.5,0L30,42.458l10.5-6.064V29.668L30.75,35.3a1.5,1.5,0,0,1-1.5,0l-20-11.55a1.5,1.5,0,0,1-.75-1.3v-4a1.5,1.5,0,0,1,.75-1.3l20-11.54a1.5,1.5,0,0,1,1.5,0l20,11.54a1.5,1.5,0,0,1,.75,1.3v23.1a1.5,1.5,0,0,1-.75,1.3l-20,11.54A1.5,1.5,0,0,1,30,54.59ZM13,41.55l17,9.808L48.5,40.684V19.316L30,8.642,11.5,19.316v2.268L30,32.268l11.25-6.5a1.5,1.5,0,0,1,2.25,1.3V37.26a1.5,1.5,0,0,1-.75,1.3l-12,6.93a1.5,1.5,0,0,1-1.5,0L17.719,38.83ZM30,25.688a1.5,1.5,0,0,1-.75-.2l-7.091-4.094a1.5,1.5,0,0,1,0-2.6L29.25,14.7a1.5,1.5,0,0,1,1.5,0L37.841,18.8a1.5,1.5,0,0,1,0,2.6L30.75,25.487A1.5,1.5,0,0,1,30,25.688Zm-4.091-5.594L30,22.456l4.091-2.362L30,17.732Z" fill="#7f778c" /><path d="M50,19.951a1.5,1.5,0,0,1-.749-.2L30,8.642,10.75,19.75a1.5,1.5,0,0,1-1.5-2.6l20-11.54a1.5,1.5,0,0,1,1.5,0l20,11.54a1.5,1.5,0,0,1-.751,2.8Z" fill="#aaadbf" /></svg>
  },
  {
    id: 3,
    name: 'Dribble',
    key: WIDGETS_KEYS.Dribble,
    desc: 'Dribble',
    avatar: <svg key="Dribble" width="256px" height="256px" viewBox="0 0 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
      <g>
        <path d="M128,8.5 C194,8.5 247.4,61.9 247.4,127.8 C247.4,193.7 194,247.2 128,247.2 C62,247.2 8.6,193.8 8.6,127.9 C8.6,62 62,8.5 128,8.5 L128,8.5 L128,8.5 Z" fill="#E74D89"></path>
        <path d="M128,255.7 C57.4,255.7 0,198.4 0,127.9 C0,57.3 57.4,0 128,0 C198.6,0 256,57.3 256,127.8 C256,198.3 198.6,255.7 128,255.7 L128,255.7 L128,255.7 Z M235.9,145.3 C232.2,144.1 202.1,135.2 167.8,140.6 C182.1,179.8 187.9,211.8 189,218.4 C213.6,201.9 231.1,175.7 235.9,145.3 L235.9,145.3 L235.9,145.3 Z M170.7,228.5 C169.1,218.9 162.7,185.5 147.4,145.7 C147.2,145.8 146.9,145.9 146.7,145.9 C85,167.4 62.9,210.1 60.9,214.1 C79.4,228.5 102.7,237.1 128,237.1 C143.1,237.2 157.6,234.1 170.7,228.5 L170.7,228.5 L170.7,228.5 Z M46.8,201 C49.3,196.8 79.3,147.2 135.7,128.9 C137.1,128.4 138.6,128 140,127.6 C137.3,121.4 134.3,115.2 131.1,109.1 C76.5,125.4 23.5,124.7 18.7,124.6 C18.7,125.7 18.6,126.8 18.6,127.9 C18.7,156 29.3,181.6 46.8,201 L46.8,201 L46.8,201 Z M21,105.6 C25.9,105.7 70.9,105.9 122.1,92.3 C104,60.1 84.4,33.1 81.6,29.2 C50.9,43.6 28.1,71.8 21,105.6 L21,105.6 L21,105.6 Z M102.4,21.8 C105.4,25.8 125.3,52.8 143.2,85.7 C182.1,71.1 198.5,49.1 200.5,46.3 C181.2,29.2 155.8,18.8 128,18.8 C119.2,18.8 110.6,19.9 102.4,21.8 L102.4,21.8 L102.4,21.8 Z M212.6,58.9 C210.3,62 192,85.5 151.6,102 C154.1,107.2 156.6,112.5 158.9,117.8 C159.7,119.7 160.5,121.6 161.3,123.4 C197.7,118.8 233.8,126.2 237.4,126.9 C237.1,101.2 227.9,77.5 212.6,58.9 L212.6,58.9 L212.6,58.9 Z" fill="#B2215A"></path>
      </g>
    </svg>
  },
  {
    id: 4,
    name: 'Unsplash',
    key: WIDGETS_KEYS.Unsplash,
    desc: 'Unsplash',
    avatar: <svg key="Unsplash" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg"><title>Unsplash icon</title><path fill="#FFF" d="M7.5 6.75V0h9v6.75h-9zm9 3.75H24V24H0V10.5h7.5v6.75h9V10.5z" /></svg>
  },
  {
    id: 5,
    name: 'Medium',
    key: WIDGETS_KEYS.Medium,
    desc: 'medium',
    avatar: <svg key="medium" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
      viewBox="0 0 393.541 393.541" style={{ background: 'enable-background:new 0 0 393.541 393.541' }}>
      <g>
        <path fill="#00FD8D" d="M384.045,363.079L262.84,304.812L261.927,40.68c-0.021-6.166,6.416-10.229,11.973-7.557
     l114.908,55.256c2.893,1.391,4.733,4.318,4.733,7.528v261.201C393.54,361.989,388.443,365.194,384.045,363.079z"/>
        <path fill="#00E470" d="M262.84,304.812L131.66,241.74L257.948,33.818c2.231-3.673,6.886-5.054,10.759-3.192l116.514,56.029
     c4.454,2.142,6.085,7.661,3.51,11.879L262.84,304.812z"/>
        <path fill="#00C967" d="M262.84,304.812L131.66,241.74L11.421,45.942c-3.35-5.455,2.479-11.914,8.248-9.14L131.66,90.655
     L262.84,304.812z"/>
        <path fill="#00AD6C" d="M122.164,363.078l-118.41-56.94C1.459,305.034,0,302.713,0,300.167V37.548
     c0-4.726,4.937-7.831,9.197-5.782L131.66,90.655v266.452C131.66,361.988,126.562,365.193,122.164,363.078z"/>
      </g>
    </svg>
  },
  {
    id: 6,
    name: 'Pinterest',
    key: WIDGETS_KEYS.Pinterest,
    desc: 'pinterest',
    avatar: <svg key="pinterest" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path fill="#BD081C" fillRule="evenodd" d="M12,0 C5.37225,0 0,5.37225 0,12 C0,17.0835 3.16275,21.426 7.62675,23.17425 C7.52175,22.22475 7.42725,20.76825 7.66875,19.73175 C7.88625,18.79575 9.07575,13.767 9.07575,13.767 C9.07575,13.767 8.7165,13.0485 8.7165,11.98575 C8.7165,10.317 9.684,9.07125 10.88775,9.07125 C11.9115,9.07125 12.4065,9.84 12.4065,10.76175 C12.4065,11.7915 11.751,13.3305 11.41275,14.757 C11.13,15.95175 12.01125,16.926 13.1895,16.926 C15.3225,16.926 16.962,14.67675 16.962,11.43075 C16.962,8.5575 14.89725,6.54825 11.949,6.54825 C8.535,6.54825 6.531,9.1095 6.531,11.75625 C6.531,12.7875 6.92775,13.89375 7.4235,14.4945 C7.52175,14.61375 7.536,14.71725 7.50675,14.83875 C7.416,15.21825 7.2135,16.03275 7.17375,16.2 C7.12125,16.419 6.99975,16.46625 6.7725,16.3605 C5.27325,15.66225 4.3365,13.4715 4.3365,11.71125 C4.3365,7.926 7.08675,4.44975 12.2655,4.44975 C16.428,4.44975 19.6635,7.416 19.6635,11.3805 C19.6635,15.516 17.05575,18.8445 13.43625,18.8445 C12.2205,18.8445 11.0775,18.21225 10.686,17.466 C10.686,17.466 10.0845,19.75725 9.93825,20.319 C9.6675,21.36075 8.93625,22.66725 8.4465,23.4645 C9.57,23.8125 10.76325,24 12,24 C18.62775,24 24,18.627 24,12 C24,5.37225 18.62775,0 12,0" />
    </svg>

  },
  {
    id: 7,
    name: 'Reddit',
    key: WIDGETS_KEYS.Reddit,
    desc: 'reddit',
    avatar: <svg key="reddit" xmlns="http://www.w3.org/2000/svg"
      aria-label="Reddit" role="img"
      viewBox="0 0 512 512"><rect
        width="512" height="512"
        rx="15%"
        fill="#f40" /><g fill="#fff"><ellipse cx="256" cy="307" rx="166" ry="117" /><circle cx="106" cy="256" r="42" /><circle cx="407" cy="256" r="42" /><circle cx="375" cy="114" r="32" /></g><g strokeLinecap="round" strokeLinejoin="round" fill="none"><path d="m256 196 23-101 73 15" stroke="#fff" strokeWidth="16" /><path d="m191 359c33 25 97 26 130 0" stroke="#f40" strokeWidth="13" /></g><g fill="#f40"><circle cx="191" cy="287" r="31" /><circle cx="321" cy="287" r="31" /></g></svg>
  }
];


