const IP="zevoracraft.mcsh.gg";
const ipText=document.getElementById("ipText");
const toast=document.getElementById("toast");
async function copyIp(){try{await navigator.clipboard.writeText(IP);toast.textContent="IP adresi kopyalandı!";}catch(e){toast.textContent="IP: "+IP;}toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),2200);}
document.getElementById("copyIp").addEventListener("click",copyIp);
document.getElementById("copyIp2").addEventListener("click",copyIp);
async function status(){const s=document.getElementById("statusText"),p=document.getElementById("players"),v=document.getElementById("version"),d=document.getElementById("statusDot");s.textContent="Sunucu durumu kontrol ediliyor";try{const r=await fetch("https://api.mcsrvstat.us/3/"+IP);if(!r.ok)throw Error();const x=await r.json();if(x.online){s.textContent="Sunucu şu anda çevrimiçi";d.style.background="#4ee1b0";p.textContent=(x.players?.online??0)+" / "+(x.players?.max??"?");v.textContent=x.version||"Java";}else{s.textContent="Sunucu şu anda çevrimdışı";d.style.background="#ff657a";p.textContent="0";v.textContent="—";}}catch(e){s.textContent="Durum bilgisi alınamadı";p.textContent="—";v.textContent="—";}}
document.getElementById("refresh").addEventListener("click",status);status();
