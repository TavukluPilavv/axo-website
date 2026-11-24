const IP="zevoracraft.mcsh.gg";
const $=id=>document.getElementById(id);
function toast(message){const el=$("toast");if(!el)return;el.textContent=message;el.classList.add("show");setTimeout(()=>el.classList.remove("show"),2300);}
async function copyIp(){try{await navigator.clipboard.writeText(IP);toast("Sunucu IP'si kopyalandı!");}catch(e){toast("Sunucu IP: "+IP);}}
if($("copyIp"))$("copyIp").addEventListener("click",copyIp);
if($("copyIp2"))$("copyIp2").addEventListener("click",copyIp);
let authMode="login";
function openAuth(mode){authMode=mode;$("authTitle").textContent=mode==="login"?"Giriş Yap":"Kayıt Ol";$("emailField").classList.toggle("hidden",mode==="login");$("switchAuth").textContent=mode==="login"?"Hesabın yok mu? Kayıt ol":"Zaten hesabın var mı? Giriş yap";$("authModal").classList.add("open");}
document.querySelectorAll("[data-auth]").forEach(b=>b.addEventListener("click",()=>openAuth(b.dataset.auth)));
if($("switchAuth"))$("switchAuth").onclick=()=>openAuth(authMode==="login"?"register":"login");
document.querySelectorAll("[data-close]").forEach(b=>b.onclick=()=>$("authModal").classList.remove("open"));
if($("authModal"))$("authModal").onclick=e=>{if(e.target===$("authModal"))$("authModal").classList.remove("open");};
let activePlayer=localStorage.getItem("axo_demo_player")||"";
function paintAccount(){const on=!!activePlayer;document.querySelectorAll("[data-auth]").forEach(b=>b.classList.toggle("hidden",on));if($("accountButton"))$("accountButton").classList.toggle("hidden",!on);if(on){$("accountName").textContent=activePlayer;$("menuName").textContent=activePlayer;$("accountTag").textContent="OYUNCU";$("menuTag").textContent="OYUNCU";}}
if($("authForm"))$("authForm").onsubmit=e=>{e.preventDefault();const name=$("mcName").value.trim();if(!/^[A-Za-z0-9_]{3,16}$/.test(name)){toast("Minecraft kullanıcı adı 3-16 karakter olmalı.");return;}activePlayer=name;localStorage.setItem("axo_demo_player",name);$("authModal").classList.remove("open");$("authForm").reset();paintAccount();toast("Demo hesap görünümü açıldı. Gerçek giriş henüz bağlı değil.");};
if($("accountButton"))$("accountButton").onclick=()=> $("accountMenu").classList.toggle("hidden");
document.addEventListener("click",e=>{const menu=$("accountMenu"),button=$("accountButton");if(menu&&!menu.contains(e.target)&&e.target!==button)menu.classList.add("hidden");});
if($("logoutButton"))$("logoutButton").onclick=()=>{activePlayer="";localStorage.removeItem("axo_demo_player");$("accountMenu").classList.add("hidden");paintAccount();toast("Demo hesaptan çıkış yapıldı.");};
if($("menuChest"))$("menuChest").onclick=()=>location.href="sandik.html";
if($("menuSupport"))$("menuSupport").onclick=()=>location.href="support.html";
if($("menuProfile"))$("menuProfile").onclick=()=>location.href="profil.html";
if($("menuCredits"))$("menuCredits").onclick=()=>location.href="kredi.html";
if($("menuStore"))$("menuStore").onclick=()=>location.href="magaza.html";
async function status(){const s=$("statusText"),p=$("players"),v=$("version"),d=$("statusDot");if(!s)return;s.textContent="Sunucu durumu kontrol ediliyor";try{const r=await fetch("https://api.mcsrvstat.us/3/"+IP);if(!r.ok)throw Error();const x=await r.json();if(x.online){s.textContent="Sunucu şu anda çevrimiçi";d.style.background="#4ee1b0";p.textContent=(x.players?.online??0)+" / "+(x.players?.max??"?");v.textContent=x.version||"Java";}else{s.textContent="Sunucu şu anda çevrimdışı";d.style.background="#ff657a";p.textContent="0";v.textContent="—";}}catch(e){s.textContent="Durum bilgisi alınamadı";p.textContent="—";v.textContent="—";}}
if($("refresh"))$("refresh").onclick=status;
status();paintAccount();
const navTabs=[...document.querySelectorAll(".main-nav .nav-tab")];
function setActiveTab(){const hash=location.hash||"#anasayfa";navTabs.forEach(a=>a.classList.toggle("active",a.getAttribute("href")===hash));}
window.addEventListener("hashchange",setActiveTab);setActiveTab();
