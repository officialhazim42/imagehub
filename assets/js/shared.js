// ── PAGE FAVICON ───────────────────────────
(function(){
  const page=location.pathname.split('/').pop().replace(/\.html$/,'')||'index';
  const icon=page==='index'?'home':page;
  const href='../assets/icons/'+icon+'.svg';
  const link=document.createElement('link');
  link.rel='icon';
  link.type='image/svg+xml';
  link.href=href;
  document.head.appendChild(link);
})();

// ── THEME ─────────────────────────────────
(function(){
  const saved=localStorage.getItem('imagehub-theme')||'dark';
  if(saved==='light')document.documentElement.dataset.pendingLight='1';
})();
function applySavedTheme(){
  if(document.documentElement.dataset.pendingLight){
    document.body.classList.add('light');
    const lbl=document.getElementById('themeLabel');
    if(lbl)lbl.textContent='Light';
    document.querySelectorAll('.toggle-knob i').forEach(i=>i.className='fas fa-sun');
  }
}
function toggleTheme(){
  const isLight=document.body.classList.toggle('light');
  localStorage.setItem('imagehub-theme',isLight?'light':'dark');
  const lbl=document.getElementById('themeLabel');
  if(lbl)lbl.textContent=isLight?'Light':'Dark';
  document.querySelectorAll('.toggle-knob i').forEach(i=>i.className=isLight?'fas fa-sun':'fas fa-moon');
}
document.addEventListener('DOMContentLoaded',applySavedTheme);

const developerSocials=[
  {name:'Instagram',icon:'fa-instagram',handle:'@officialhazim42',url:'https://instagram.com/officialhazim42',appUrl:'instagram://user?username=officialhazim42'},
  {name:'GitHub',icon:'fa-github',handle:'@officialhazim42',url:'https://github.com/officialhazim42'},
  {name:'Reddit',icon:'fa-reddit-alien',handle:'u/officialhazim42',url:'https://www.reddit.com/user/officialhazim42',appUrl:'reddit://user/officialhazim42'},
  {name:'Snapchat',icon:'fa-snapchat-ghost',handle:'@officialhazim42',url:'https://www.snapchat.com/add/officialhazim42',appUrl:'snapchat://add/officialhazim42'},
  {name:'Discord',icon:'fa-discord',handle:'officialhazim42',url:'https://discord.com/users/officialhazim42',copy:'officialhazim42'},
  {name:'Threads',icon:'fa-threads',handle:'@officialhazim42',url:'https://www.threads.net/@officialhazim42',appUrl:'threads://@officialhazim42'},
  {name:'LinkedIn',icon:'fa-linkedin-in',handle:'hazim-bashir-faqeer',url:'https://www.linkedin.com/in/hazim-bashir-faqeer',appUrl:'linkedin://in/hazim-bashir-faqeer'},
  {name:'X',icon:'fa-x-twitter',handle:'@officialhazim42',url:'https://x.com/officialhazim42'},
  {name:'Telegram',icon:'fa-telegram',handle:'@officialhazim42',url:'https://t.me/officialhazim42',appUrl:'tg://resolve?domain=officialhazim42'},
  {name:'YouTube',icon:'fa-youtube',handle:'@officialhazim42',url:'https://youtube.com/@officialhazim42'}
];
const featuredDeveloperSocials=developerSocials.filter(social=>['Instagram','GitHub','YouTube'].includes(social.name));

function openDeveloperSocial(social,event){
  if(!social)return;
  if(social.copy){
    event.preventDefault();
    window.open(social.url,'_blank','noopener,noreferrer');
    copyDeveloperText(social.copy,'Discord username copied',`Discord username: ${social.copy}`);
  }
  if(!social.appUrl || !/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) return;
  event.preventDefault();
  const started=Date.now();
  window.location.href=social.appUrl;
  window.setTimeout(()=>{
    if(!document.hidden && Date.now()-started<1800)window.location.href=social.url;
  },900);
}

function copyDeveloperText(text,successMessage,fallbackMessage){
  if(!navigator.clipboard){
    showDeveloperToast(fallbackMessage);
    return;
  }
  navigator.clipboard.writeText(text).then(()=>showDeveloperToast(successMessage)).catch(()=>showDeveloperToast(fallbackMessage));
}

function openDeveloperEmail(event){
  event.preventDefault();
  const address='hazimbashirfaqeer@gmail.com';
  const mailto=`mailto:${address}?subject=${encodeURIComponent('Connecting with Hazim Bashir')}`;
  const started=Date.now();
  window.location.href=mailto;
  window.setTimeout(()=>{
    if(!document.hidden && Date.now()-started>=1100){
      copyDeveloperText(address,'Email address copied to clipboard',`Email: ${address}`);
    }
  },1100);
}

function showDeveloperToast(message){
  const toast=document.getElementById('developerToast');
  if(!toast)return;
  toast.textContent=message;
  toast.classList.add('show');
  window.clearTimeout(showDeveloperToast.timer);
  showDeveloperToast.timer=window.setTimeout(()=>toast.classList.remove('show'),2400);
}

function buildDeveloperPanel(){
  if(document.getElementById('developerDock'))return;
  const links=featuredDeveloperSocials.map(social=>`<a href="${social.url}" class="developer-social-link" target="_blank" rel="noopener noreferrer" aria-label="${social.name}: ${social.handle}" title="${social.name}" data-social="${social.name}"><i class="fab ${social.icon}"></i></a>`).join('');
  const cards=developerSocials.map(social=>`<a href="${social.url}" class="developer-profile-link" target="_blank" rel="noopener noreferrer" data-social="${social.name}" aria-label="${social.name}: ${social.handle}"><i class="fab ${social.icon}"></i><span><strong>${social.name}</strong><small>${social.handle}</small></span><i class="fas fa-arrow-up-right-from-square"></i></a>`).join('');
  const dock=document.createElement('aside');
  dock.id='developerDock';
  dock.className='developer-dock';
  dock.innerHTML=`<button class="developer-trigger" type="button" aria-expanded="false" aria-controls="developerBar" aria-label="Open developer information"><i class="fas fa-user"></i></button><div class="developer-bar" id="developerBar"><button class="developer-bar-copy" type="button" aria-label="Open developer profile"><strong>Designed and Developed by @officialhazim42</strong></button><button class="developer-open" type="button">About Developer</button><div class="developer-socials" aria-label="Developer social links">${links}</div></div></aside><div class="developer-modal" id="developerModal" aria-hidden="true"><div class="developer-dialog" role="dialog" aria-modal="true" aria-labelledby="developerTitle"><button class="developer-close" type="button" aria-label="Close developer information"><i class="fas fa-xmark"></i></button><div class="developer-header"><div class="developer-avatar"><i class="fas fa-code"></i></div><div><p class="developer-eyebrow">About the developer</p><h2 id="developerTitle">Hazim Bashir</h2><p class="developer-role">Android Developer &amp; Software Creator</p><div class="developer-badges"><span class="developer-badge urdu" lang="ur">حازم بشیر</span><span class="developer-badge">@officialhazim42</span></div><p class="developer-location"><i class="fas fa-location-dot"></i> Ganderbal, Jammu &amp; Kashmir, India</p></div></div><section class="developer-section"><h3>About Me</h3><p class="developer-intro">Hi, I'm Hazim Bashir (حازم بشیر), an independent software developer from Ganderbal, Jammu &amp; Kashmir, India. I specialize in designing modern, high-performance, and privacy-first Android applications using Kotlin and Jetpack Compose. My mission is to craft clean, offline-first mobile experiences that respect user data privacy without compromise.</p></section><section class="developer-section"><h3>Quick Information</h3><dl class="developer-facts"><div><dt>Full Name</dt><dd>Hazim Bashir (حازم بشیر)</dd></div><div><dt>Location</dt><dd>Ganderbal, Jammu &amp; Kashmir, India</dd></div><div><dt>Specialization</dt><dd>Android Development, Kotlin, and Jetpack Compose</dd></div><div><dt>Email</dt><dd><a class="developer-email" href="mailto:hazimbashirfaqeer@gmail.com?subject=Connecting%20with%20Hazim%20Bashir">hazimbashirfaqeer@gmail.com</a></dd></div></dl></section><section class="developer-section"><h3>Connect with the developer</h3><div class="developer-profile-grid">${cards}</div></section><p class="developer-footer">Crafted with care by Hazim Bashir (حازم بشیر) in Kashmir 🏔️</p><div class="developer-footer-socials"><span>Instagram: @officialhazim42</span><span>GitHub: @officialhazim42</span><span>YouTube: @officialhazim42</span><span>LinkedIn: hazim-bashir-faqeer</span></div><p class="developer-note">Social links open the official profile. Native apps are attempted first on supported mobile devices. Discord copies the username before opening the profile.</p></div></div><div class="developer-toast" id="developerToast" role="status" aria-live="polite"></div>`;
  document.body.appendChild(dock);
  const trigger=dock.querySelector('.developer-trigger');
  const bar=dock.querySelector('.developer-bar');
  const modal=dock.querySelector('.developer-modal');
  const setExpanded=open=>{bar.classList.toggle('show',open);trigger.setAttribute('aria-expanded',String(open));trigger.setAttribute('aria-label',open?'Close developer information':'Open developer information');trigger.innerHTML=open?'<i class="fas fa-xmark"></i>':'<i class="fas fa-user"></i>';};
  trigger.addEventListener('click',()=>setExpanded(!bar.classList.contains('show')));
  const openModal=()=>{modal.classList.add('show');modal.setAttribute('aria-hidden','false');};
  const attribution=dock.querySelector('.developer-bar-copy');
  attribution.addEventListener('click',openModal);
  dock.querySelector('.developer-open').addEventListener('click',event=>{event.stopPropagation();openModal();});
  dock.querySelector('.developer-email').addEventListener('click',openDeveloperEmail);
  dock.querySelector('.developer-close').addEventListener('click',()=>{modal.classList.remove('show');modal.setAttribute('aria-hidden','true');});
  modal.addEventListener('click',event=>{if(event.target===modal){modal.classList.remove('show');modal.setAttribute('aria-hidden','true');}});
  dock.querySelectorAll('[data-social]').forEach(link=>link.addEventListener('click',event=>openDeveloperSocial(developerSocials.find(social=>social.name===link.dataset.social),event)));
}

document.addEventListener('DOMContentLoaded',buildDeveloperPanel);

const toolGuideMap = {
  'Compress IMAGE': {
    steps: ['Upload a JPG, PNG, or WebP image.', 'Move the quality slider to find the right balance between size and clarity.', 'Check the estimated output size before downloading.', 'Save the optimized file to share or post online.'],
    tips: ['Use 70–80% quality for quick web sharing.', 'Keep the original file in case you want to re-export later.', 'JPG is usually the lightest option for photos.']
  },
  'Upscale': {
    steps: ['Load the image you want to enlarge.', 'Choose the scale or output dimensions that fit your needs.', 'Review the preview for sharpness and detail.', 'Export the enhanced image in the desired format.'],
    tips: ['Upscaling works best when the source image is already reasonably clear.', 'Use the smallest enlargement needed to avoid excessive artifacting.', 'Keep a backup of the original if you want to compare results.']
  },
  'Remove Background': {
    steps: ['Upload an image with a clear subject.', 'Let the background remover analyze the cutout.', 'Preview the result and adjust any needed detail or edge settings.', 'Download the transparent or cleaned export.'],
    tips: ['Simple backgrounds and high contrast usually produce cleaner cutouts.', 'Avoid very tiny details or fuzzy edges if you need a precise background removal.', 'Try export as PNG when transparency matters.']
  },
  'Photo Editor': {
    steps: ['Upload the image you want to improve.', 'Adjust light, color, filters, or text layers.', 'Use the preview to refine the edit before exporting.', 'Download the final image when it looks right.'],
    tips: ['Start with subtle edits before increasing exposure or saturation.', 'Use text sparingly so it stays readable and polished.', 'Preview the result at full size before saving.']
  },
  'Resize IMAGE': {
    steps: ['Choose the image you want to resize.', 'Set width, height, or percentage values.', 'Keep aspect ratio locked unless you intentionally want distortion.', 'Download the resized version.'],
    tips: ['Resize before uploading to social platforms to avoid oversized files.', 'Use exact dimension presets for banners, avatars, or profile images.', 'Check the output on a device preview before finalizing.']
  },
  'Crop IMAGE': {
    steps: ['Load the image and frame the area you want to keep.', 'Choose an aspect ratio if needed.', 'Preview the crop before confirming.', 'Download the trimmed image.'],
    tips: ['Crop first to remove distractions and improve focus.', 'Shoot for balanced composition so the crop feels intentional.', 'A tighter crop often feels cleaner on social media.']
  },
  'Rotate IMAGE': {
    steps: ['Upload the image that needs rotation.', 'Select the angle or flip option you want.', 'Check the preview for the final orientation.', 'Download the corrected file.'],
    tips: ['Use the smallest adjustment needed to correct the image.', 'Flip horizontally only when you intentionally want a mirrored result.', 'Review the final image before posting to avoid awkward portrait rotation.']
  },
  'Convert to JPG': {
    steps: ['Choose a PNG, WebP, HEIC, or other compatible source file.', 'Pick the JPG quality you prefer.', 'Preview the output size estimate and final result.', 'Download the JPG version.'],
    tips: ['JPG is excellent for photos and email sharing.', 'Lower quality values reduce file size significantly.', 'Use PNG if you need transparent backgrounds.']
  },
  'Convert from JPG': {
    steps: ['Upload the JPG image.', 'Select the new output format such as PNG or WebP.', 'Review the converted preview and dimensions.', 'Download the converted image.'],
    tips: ['Use PNG when you need transparency or crisp text.', 'Use WebP for a smaller file without much visual loss.', 'Keep the original in case you want to reconvert again later.']
  },
  'HTML to IMAGE': {
    steps: ['Paste HTML or enter a URL to capture.', 'Adjust the page sizing or output settings if available.', 'Preview the rendered image before capture.', 'Download your generated image file.'],
    tips: ['Simplify the page design for cleaner screenshots.', 'Use a fixed width when you need a consistent social or card layout.', 'Check the final image for any broken CSS or mobile layout issues.']
  },
  'Watermark IMAGE': {
    steps: ['Upload the image you want to protect.', 'Add your text or logo watermark with the desired size and placement.', 'Preview the result on the sample image.', 'Download the watermarked export.'],
    tips: ['Place the watermark in a corner to avoid blocking the subject.', 'Use semi-transparent text for a cleaner, less intrusive mark.', 'Keep the watermark readable without overwhelming the image.']
  },
  'Blur Face': {
    steps: ['Upload the image containing one or more faces.', 'Select the blur area or use the face detection controls.', 'Preview the blurred result to confirm privacy protection.', 'Download the final image.'],
    tips: ['Use blur on faces or sensitive details to protect privacy.', 'Check the edges so the blur remains clean and natural.', 'A stronger blur works well for full-privacy masking.']
  },
  'Meme Generator': {
    steps: ['Choose a base image or upload your own.', 'Add the top and bottom text.', 'Adjust size, color, spacing, and style.', 'Download the meme and share it.'],
    tips: ['Keep text short and high contrast for readability.', 'Use a bold font for small screens and mobile viewing.', 'Try a big empty caption area if the image is busy.']
  }
};

function getGuideHref(){ return location.pathname.includes('/tools/') ? '../pages/guides.html' : 'guides.html'; }

function getGuideSlug(label){ return label.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''); }

function buildGuideModal(){
  if(document.getElementById('guideModal')) return document.getElementById('guideModal');
  const modal=document.createElement('div');
  modal.id='guideModal';
  modal.className='guide-modal';
  modal.setAttribute('aria-hidden','true');
  modal.innerHTML=`<div class="guide-drawer" role="dialog" aria-modal="true" aria-labelledby="guideTitle"><div class="guide-drawer-header"><div><p class="guide-eyebrow">ImageHub help</p><h2 id="guideTitle">Guides & tips</h2></div><button class="guide-close" type="button" aria-label="Close help"><i class="fas fa-xmark"></i></button></div><div class="guide-list" id="guideModalList"></div><div class="guide-footer"><a class="guide-full-link" href="${getGuideHref()}">Open full guide library</a></div></div>`;
  document.body.appendChild(modal);
  const close=modal.querySelector('.guide-close');
  close.addEventListener('click',()=>modal.classList.remove('show'));
  modal.addEventListener('click',event=>{if(event.target===modal){modal.classList.remove('show');}});
  return modal;
}

function openGuideModal(){
  const modal=buildGuideModal();
  const list=document.getElementById('guideModalList');
  const items=Object.entries(toolGuideMap).map(([tool,guide])=>{
    const href=`${getGuideHref()}#${getGuideSlug(tool)}`;
    return `<a class="guide-item" href="${href}"><span>${tool}</span><small>${guide.steps[0]}</small></a>`;
  }).join('');
  list.innerHTML=items;
  modal.classList.add('show');
  modal.setAttribute('aria-hidden','false');
}

function injectGuideLauncher(){
  const currentTool=document.querySelector('.tool-header');
  const target=document.querySelector('.nav-right-tools');
  if(!currentTool || !target || document.getElementById('guideLauncher')) return;
  const btn=document.createElement('button');
  btn.type='button';
  btn.id='guideLauncher';
  btn.className='guide-launcher';
  btn.innerHTML='<i class="fas fa-circle-question"></i><span>Guides</span>';
  btn.addEventListener('click',openGuideModal);
  target.appendChild(btn);
}

document.addEventListener('DOMContentLoaded',()=>{
  const guidesPage=document.getElementById('guidesPage');
  if(guidesPage){
    const cards=Object.entries(toolGuideMap).map(([tool,guide])=>`
      <article class="guide-card" id="${getGuideSlug(tool)}">
        <div class="guide-card-header">
          <span class="guide-tag">${tool}</span>
          <span class="guide-count">${guide.steps.length} steps</span>
        </div>
        <h3>How to use ${tool}</h3>
        <div class="guide-list-grid">
          <div>
            <h4>Quick steps</h4>
            <ol>${guide.steps.map(step=>`<li>${step}</li>`).join('')}</ol>
          </div>
          <div>
            <h4>Helpful tips</h4>
            <ul>${guide.tips.map(tip=>`<li>${tip}</li>`).join('')}</ul>
          </div>
        </div>
      </article>
    `).join('');
    guidesPage.innerHTML=cards;
    return;
  }

  injectGuideLauncher();
  ensureComparisonPreview();
  const preview=document.getElementById('preview');
  const canvas=document.querySelector('.canvas-stage canvas,.preview-wrap canvas');
  const syncPreview =()=>{if(preview && preview.src) syncBeforePreview(); if(canvas) syncBeforePreview();};
  if(preview)preview.addEventListener('load',syncPreview);
  if(canvas){
    const observer = new MutationObserver(()=>syncPreview());
    observer.observe(canvas,{attributes:true,attributeFilter:['src']});
  }
});

function ensureComparisonPreview(){
  if(document.getElementById('beforeAfterPanel'))return;
  const anchor=document.querySelector('.preview-wrap,.canvas-stage')||document.querySelector('.action-row');
  if(!anchor)return;
  const panel=document.createElement('section');
  panel.id='beforeAfterPanel';
  panel.className='before-after-panel';
  panel.innerHTML=`<div class="before-after-header"><span>Before &amp; After</span><small>Compare the original with the final result</small></div><div class="compare-shell" id="compareShell"><div class="compare-layer compare-before"><img id="beforePreview" alt="Original preview" /></div><div class="compare-layer compare-after"><img id="afterPreview" alt="Processed preview" /></div><div class="compare-divider" id="compareDivider"></div><input type="range" id="compareSlider" min="0" max="100" value="50" aria-label="Adjust before and after comparison" /></div>`;
  anchor.insertAdjacentElement('afterend',panel);
  const slider=document.getElementById('compareSlider');
  if(slider){slider.addEventListener('input',event=>setComparePosition(event.target.value));}
  setComparePosition(50);
  syncBeforePreview();
}

function setComparePosition(value){
  const shell=document.getElementById('compareShell');
  if(!shell)return;
  const v=Math.min(100,Math.max(0,Number(value)||50));
  shell.style.setProperty('--compare',`${v}%`);
  const divider=document.getElementById('compareDivider');
  if(divider)divider.style.left=`${v}%`;
}

function syncBeforePreview(sourceUrl){
  const before=document.getElementById('beforePreview');
  if(!before)return;
  if(sourceUrl){before.src=sourceUrl;return;}
  const preview=document.getElementById('preview');
  const sourceImage=typeof currentImg!=='undefined'&&currentImg?.src?currentImg:document.querySelector('.crop-stage img');
  if(preview && preview.src){
    before.src=preview.src;
    return;
  }
  if(sourceImage?.src){
    before.src=sourceImage.src;
    return;
  }
  const canvas=document.querySelector('.canvas-stage canvas,.preview-wrap canvas');
  if(canvas){before.src=canvas.toDataURL('image/png');}
}

function syncAfterPreview(blobOrUrl){
  const after=document.getElementById('afterPreview');
  if(!after)return Promise.resolve(false);
  const objUrl = typeof blobOrUrl === 'string' ? blobOrUrl : URL.createObjectURL(blobOrUrl);
  const loaded=new Promise(resolve=>{
    after.addEventListener('load',()=>resolve(true),{once:true});
    after.addEventListener('error',()=>resolve(false),{once:true});
  });
  after.src=objUrl;
  return loaded.then(success=>{
    if(typeof blobOrUrl !== 'string')URL.revokeObjectURL(objUrl);
    return success;
  });
}

function waitForImageLoad(image){
  if(!image)return Promise.resolve(false);
  if(image.complete)return Promise.resolve(image.naturalWidth>0);
  return new Promise(resolve=>{
    image.addEventListener('load',()=>resolve(true),{once:true});
    image.addEventListener('error',()=>resolve(false),{once:true});
  });
}

let pendingDownload=null;

function resetToolUploadState(extraReset){
  const drop=document.getElementById('drop');
  const controls=document.getElementById('controls');
  const status=document.getElementById('status');
  const preview=document.getElementById('preview');
  const stage=document.getElementById('stage');
  const pwrap=document.getElementById('pwrap');
  const panel=document.getElementById('beforeAfterPanel');
  const before=document.getElementById('beforePreview');
  const after=document.getElementById('afterPreview');
  const fin=document.getElementById('fin');
  const goBtn=document.getElementById('goBtn');
  const downloadBtn=document.getElementById('downloadReadyBtn');
  const modal=document.getElementById('dlModal');
  if(pendingDownload){
    URL.revokeObjectURL(pendingDownload.url);
    URL.revokeObjectURL(pendingDownload.previewUrl);
    pendingDownload=null;
  }
  if(modal)modal.classList.remove('show');
  if(downloadBtn){downloadBtn.disabled=true;downloadBtn.style.display='none';}
  if(drop)drop.classList.remove('over');
  if(controls)controls.style.display='none';
  if(status)status.className='status';
  if(pwrap)pwrap.classList.remove('show');
  if(stage)stage.classList.remove('show');
  if(panel)panel.classList.remove('show');
  if(preview)preview.removeAttribute('src');
  if(before)before.removeAttribute('src');
  if(after)after.removeAttribute('src');
  if(goBtn)goBtn.disabled=true;
  if(fin)fin.value='';
  if(typeof extraReset==='function')extraReset();
}

document.addEventListener('DOMContentLoaded',()=>{
  const nav=document.querySelector('.nav-right-tools');
  if(!nav||document.getElementById('menuToggle'))return;
  const base=location.pathname.includes('/tools/')?'../pages/':'';
  nav.insertAdjacentHTML('beforeend',`<button class="menu-toggle" id="menuToggle" type="button" aria-expanded="false" aria-controls="siteMenu" title="Open menu"><i class="fas fa-bars"></i></button>
    <div class="site-menu" id="siteMenu" aria-hidden="true">
      <div class="menu-heading"><span>ImageHub control center</span><small>Local only</small></div>
      <form class="menu-search" id="menuSearch"><input id="menuSearchInput" type="search" placeholder="Search tools..." aria-label="Search tools"/><button type="submit" title="Search"><i class="fas fa-arrow-right"></i></button></form>
      <div class="menu-list">
        <a class="menu-action" href="${base}index.html"><i class="fas fa-house"></i><span>Home</span></a>
        <a class="menu-action" href="${base}dashboard.html"><i class="fas fa-chart-line"></i><span>Dashboard &amp; Updates</span><span class="menu-badge" id="dashboardCount">0</span></a>
        <a class="menu-action" href="${base}history.html"><i class="fas fa-clock-rotate-left"></i><span>History</span></a>
        <a class="menu-action" href="${base}terms.html"><i class="fas fa-file-contract"></i><span>Terms and conditions</span></a>
        <a class="menu-action" href="${base}about.html"><i class="fas fa-circle-info"></i><span>About us</span></a>
      </div>
      <p class="menu-note">Your tools, history, and preferences stay in this browser.</p>
    </div>`);
  const toggle=document.getElementById('menuToggle'),menu=document.getElementById('siteMenu');
  const setMenu=open=>{menu.classList.toggle('open',open);menu.setAttribute('aria-hidden',String(!open));toggle.setAttribute('aria-expanded',String(open));toggle.innerHTML=open?'<i class="fas fa-xmark"></i>':'<i class="fas fa-bars"></i>'};
  toggle.addEventListener('click',event=>{event.stopPropagation();setMenu(!menu.classList.contains('open'));updateDashboardCount()});
  document.getElementById('menuSearch').addEventListener('submit',event=>{event.preventDefault();const query=document.getElementById('menuSearchInput').value.trim();if(query)location.href=base+'index.html?search='+encodeURIComponent(query)});
  document.addEventListener('click',event=>{if(!event.target.closest('#siteMenu')&&!event.target.closest('#menuToggle'))setMenu(false)});
  updateDashboardCount();
});

function updateDashboardCount(){
  const count=document.getElementById('dashboardCount');
  if(!count)return;
  try{count.textContent=JSON.parse(localStorage.getItem('imagehub-history-tools')||'[]').length}catch(e){count.textContent='0'}
}

// ── HISTORY ─────────────────────────────────
function saveHistoryTool(name,url){
  try{
    const entries=JSON.parse(localStorage.getItem('imagehub-history-tools')||'[]');
    const next=[{name,url},...entries.filter(e=>e.url!==url)].slice(0,6);
    localStorage.setItem('imagehub-history-tools',JSON.stringify(next));
  }catch(e){}
}

// ── DOWNLOAD MODAL ─────────────────────────────────
function ensureModal(){
  let m=document.getElementById('dlModal');
  if(!m){m=document.createElement('div');m.id='dlModal';document.body.appendChild(m)}
  return m;
}
function ensureDownloadButton(){
  let button=document.getElementById('downloadReadyBtn');
  if(button)return button;
  const goBtn=document.getElementById('goBtn');
  const actionRow=goBtn?.closest('.action-row');
  if(!actionRow)return null;
  button=document.createElement('button');
  button.id='downloadReadyBtn';
  button.type='button';
  button.className='btn btn-primary';
  button.innerHTML='<i class="fas fa-download"></i> Download';
  button.disabled=true;
  button.style.display='none';
  button.addEventListener('click',showDownloadConfirmation);
  goBtn.insertAdjacentElement('afterend',button);
  return button;
}
function downloadBlob(blobOrFiles,filename,sizeMB){
  const files=Array.isArray(blobOrFiles)?blobOrFiles:[{blob:blobOrFiles,name:filename}];
  if(!files.length)return;
  const firstFile=files[0];
  const previewUrl=URL.createObjectURL(firstFile.blob);
  const downloadUrl=URL.createObjectURL(firstFile.blob);
  if(pendingDownload){
    URL.revokeObjectURL(pendingDownload.url);
    URL.revokeObjectURL(pendingDownload.previewUrl);
  }
  pendingDownload={files,url:downloadUrl,previewUrl,filename:firstFile.name||filename,sizeMB};
  ensureModal();
  ensureComparisonPreview();
  const button=ensureDownloadButton();
  if(button){button.disabled=true;button.style.display='none';}
  const panel=document.getElementById('beforeAfterPanel');
  if(panel)panel.classList.remove('show');
  syncBeforePreview(firstFile.beforeSrc);
  const before=document.getElementById('beforePreview');
  const afterLoad=syncAfterPreview(previewUrl);
  Promise.all([waitForImageLoad(before),afterLoad]).then(([beforeLoaded,afterLoaded])=>{
    if(pendingDownload?.url!==downloadUrl)return;
    if(!beforeLoaded||!afterLoaded){
      URL.revokeObjectURL(downloadUrl);
      URL.revokeObjectURL(previewUrl);
      pendingDownload=null;
      showStatus('Preview could not be loaded. Please process the image again.','error');
      return;
    }
    if(panel){panel.classList.add('show');setComparePosition(50);}
    requestAnimationFrame(()=>requestAnimationFrame(()=>{
      if(pendingDownload?.url===downloadUrl&&button){
        button.disabled=false;
        button.style.display='';
      }
    }));
  });
}
function showDownloadConfirmation(){
  if(!pendingDownload)return;
  const m=ensureModal();
  const {files,url,previewUrl,filename,sizeMB}=pendingDownload;
  const totalSize=files.reduce((sum,file)=>sum+file.blob.size,0);
  const sizeLabel=files.length===1&&sizeMB?`${sizeMB} MB`:`${(totalSize/1024/1024).toFixed(2)} MB`;
  const beforeSrc=document.getElementById('beforePreview')?.src||document.getElementById('preview')?.src||'';
  const downloadLabel=files.length===1?filename:`${files.length} files`;
  m.innerHTML=`<div class="dl-card">
    <div class="dl-preview-grid">
      <div class="dl-preview-item">
        <span>Before</span>
        <img src="${beforeSrc}" alt="Before preview" />
      </div>
      <div class="dl-preview-item">
        <span>After</span>
        <img src="${previewUrl}" alt="After preview" />
      </div>
    </div>
    <i class="fas fa-circle-check big"></i>
    <h3>Ready to download</h3>
    <p>${downloadLabel} · ${sizeLabel}</p>
    <div class="dl-actions">
      <button class="btn btn-primary" id="confirmDownload"><i class="fas fa-download"></i> Confirm download</button>
      <button class="btn btn-secondary" id="cancelDownload">Cancel</button>
    </div>
  </div>`;
  const confirmButton=m.querySelector('#confirmDownload');
  const cancelButton=m.querySelector('#cancelDownload');
  if(confirmButton){confirmButton.addEventListener('click',()=>{
    files.forEach((file,index)=>{
      const fileUrl=index===0?url:URL.createObjectURL(file.blob);
      const link=document.createElement('a');
      link.href=fileUrl;link.download=file.name||filename||'image';document.body.appendChild(link);link.click();link.remove();
      if(index>0)setTimeout(()=>URL.revokeObjectURL(fileUrl),1000);
    });
    const button=document.getElementById('downloadReadyBtn');
    if(button){button.disabled=true;button.style.display='none';}
    pendingDownload=null;
    setTimeout(()=>{closeModal();URL.revokeObjectURL(url);URL.revokeObjectURL(previewUrl);},1000);
  })}
  if(cancelButton){cancelButton.addEventListener('click',closeModal)}
  m.classList.add('show');
}
function closeModal(){const m=document.getElementById('dlModal');if(m)m.classList.remove('show')}

// ── HELPERS ─────────────────────────────────
function fmtSize(bytes){
  if(bytes<1024)return bytes+' B';
  if(bytes<1024*1024)return (bytes/1024).toFixed(1)+' KB';
  return (bytes/1024/1024).toFixed(2)+' MB';
}
function loadImageFile(file){
  return new Promise((resolve,reject)=>{
    const img=new Image();
    const url=URL.createObjectURL(file);
    img.onload=()=>resolve({img,url});
    img.onerror=reject;
    img.src=url;
  });
}
function canvasToBlob(canvas,type,quality){
  return new Promise(resolve=>canvas.toBlob(resolve,type,quality));
}
