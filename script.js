const IP="axocraft705.mcsh.io";
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
function setActiveTab(){
 const path=(location.pathname.split("/").pop()||"index.html").toLowerCase();
 const hash=location.hash;
 navTabs.forEach(a=>{const href=(a.getAttribute("href")||"").toLowerCase();const target=href.split("#")[0];const active=href.startsWith("#")?hash===href:(target===path&&(!href.includes("#")||hash===href.split("#")[1]));a.classList.toggle("active",active);});
}
window.addEventListener("hashchange",setActiveTab);setActiveTab();


// Header cart indicator and homepage player count
(function(){const countEl=document.getElementById("headerCartCount");function refreshCart(){if(!countEl)return;let count=0;try{const cart=JSON.parse(localStorage.getItem("axo_demo_cart")||"[]");count=cart.reduce((n,item)=>n+(Number(item.qty)||1),0);}catch(e){}countEl.textContent=String(count);countEl.classList.toggle("has-items",count>0);}refreshCart();window.addEventListener("storage",refreshCart);const cartLink=document.getElementById("headerCart");if(cartLink)cartLink.addEventListener("click",()=>{refreshCart();});const discord=document.getElementById("discordLink");if(discord)discord.addEventListener("click",e=>{e.preventDefault();toast("Discord davet bağlantısı henüz eklenmedi.");});async function playerCount(){try{const r=await fetch("https://api.mcsrvstat.us/3/"+IP);const x=await r.json();const n=x.online?(x.players?.online??0):0;const p=document.getElementById("heroPlayers");const led=document.getElementById("heroOnlineLed");if(p)p.textContent=String(n);if(led)led.style.background=x.online?"#42dfa7":"#ef536b";}catch(e){const p=document.getElementById("heroPlayers");if(p)p.textContent="—";}}playerCount();})();

// Copy the public AxoCraft address
const copyAddressButton=document.getElementById("copyAddress");if(copyAddressButton)copyAddressButton.addEventListener("click",copyIp);
