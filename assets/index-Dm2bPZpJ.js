import{r as n,j as s}from"./index-h6kbqKy8.js";import{c as a}from"./createLucideIcon-BFmNxdQq.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=[["circle",{cx:"8",cy:"18",r:"4",key:"1fc0mg"}],["path",{d:"M12 18V2l7 4",key:"g04rme"}]],l=a("Music2",u);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d=[["circle",{cx:"12",cy:"18",r:"4",key:"m3r9ws"}],["path",{d:"M16 18V2",key:"40x2m5"}]],p=a("Music3",d),m="https://www.bensound.com/bensound-music/bensound-sway.mp3",x=()=>{const[c,e]=n.useState(!1),o=n.useRef(null);n.useEffect(()=>{const r=o.current.play();r!==void 0&&r.then(()=>{e(!0)}).catch(y=>{console.warn("Music autoplay was prevented by the browser."),e(!1)})},[]);const i=()=>{const t=o.current;c?(t.pause(),e(!1)):(t.play(),e(!0))};return s.jsxs(s.Fragment,{children:[s.jsx("audio",{ref:o,src:m,loop:!0}),s.jsx("button",{onClick:i,className:`music-toggle-button ${c?"playing":""}`,"aria-label":"Toggle Music",children:c?s.jsx(p,{size:20}):s.jsx(l,{size:20})})]})};export{x as default};
