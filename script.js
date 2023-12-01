let asocijacija;
let interval, vreme = 0, vreme1 = 10, vreme2 = 0;
let naPotezu = 1;
let ime1, ime2;
let poeni1 = 0, poeni2 = 0;
let smeDaIgra = true, igraGotova = false;

function pocni_igru() {
    ime1 = document.getElementById("ime_igrac1").value;
    ime2 = document.getElementById("ime_igrac2").value;
    localStorage.setItem("igrac1", ime1);
    localStorage.setItem("igrac2", ime2);
    if(ime1 != "" && ime2 != "") {        
        location.href = "asocijacije-igra.html";
        let asocijacije = [];
        asocijacije[0] = {A1:"BOJA", A2:"OSA", A3:"MRLJA", A4:"GROZNICA", A:"ŽUTA", B1:"DVOR", B2:"VOŽNJA", B3:"NASTA", B4:"NOĆ", B:"LUDA", 
            C1:"DRUG", C2:"JAPAN", C3:"POMOĆ", C4:"UTAKMICA", C:"PRIJATELJ", D1:"DOKTOR", D2:"PRAKSA", D3:"PREGLED", D4:"IZABRANI", D:"LEKAR", F:"KUĆA"};
        asocijacije[1] = {A1:"SALATA", A2:"JUG", A3:"KIVI", A4:"MANGO", A:"VOĆE", B1:"INDUSTRIJA", B2:"PRETRAŽIVAČ", B3:"KOREN", B4:"GRAĐA", B:"DRVO", 
            C1:"BEOGRAD", C2:"NOVI SAD", C3:"NIŠ", C4:"ZBOGOM", C:"SRBIJA", D1:"MALI", D2:"UNIJA", D3:"KUP NACIJA", D4:"KRALJICA", D:"AFRIKA", F:"ŠLJIVA"};
        asocijacije[2] = {A1:"NOVOSTI", A2:"ŠKOLJ", A3:"ŠKOLA", A4:"MATURA", A:"VEČE", B1:"SASTANAK", B2:"SPORT", B3:"ŠEF", B4:"KONGRES", B:"SALA", 
            C1:"PAR", C2:"NOGE", C3:"ŠTIKLA", C4:"KOŽA", C:"CIPELE", D1:"VOŽNJA", D2:"SKIJANJE", D3:"LETENJE", D4:"BAJAGA", D:"INSTRUKTOR", F:"PLES"};
        asocijacije[3] = {A1:"ZANIMANJE", A2:"POSAO", A3:"VOJNIK", A4:"ADVOKAT", A:"PROFESIJA", B1:"PRED VRATIMA", B2:"VOJSKOVOĐA", B3:"KARTAGINA", B4:"SLONOVI", B:"HANIBAL", 
            C1:"MIŠIĆ", C2:"DUGAČAK", C3:"CIPELA", C4:"DLAKA", C:"JEZIK", D1:"FONOLOGIJA", D2:"SINTAKSA", D3:"SEMANIKA", D4:"PRAVILA", D:"GRAMATIKA", F:"LEKTOR"};
        asocijacije[4] = {A1:"OSMEH", A2:"DUNAV", A3:"IZBOR", A4:"ŠIROK", A:"ŠIROK", B1:"LIPE", B2:"KUĆE", B3:"GLAVNA", B4:"SLEPA", B:"ULICA", 
            C1:"SAGA", C2:"BOGOVI", C3:"PRVI", C4:"VEČE", C:"SUMRAK", D1:"TABAK", D2:"ROTO", D3:"OFSET", D4:"DUBOKA", D:"ŠTAMPA", F:"BULEVAR"};
        localStorage.setItem("asocijacije", JSON.stringify(asocijacije));
    } else {
        alert("Popunite imena igrača da bi ste započeli igru.");
    }
}

function pokreni() {
    ime1 = localStorage.getItem("igrac1");
    ime2 = localStorage.getItem("igrac2");
    document.getElementById("igrac1").innerHTML = ime1 + ": " + vreme1;
    document.getElementById("igrac2").innerHTML = ime2 + ": " + vreme2;
    document.getElementById("igrac1").style.border = "4px solid white";
    document.getElementById("tajmer").innerHTML = Math.floor(vreme / 60) + ":" + (vreme % 60);
    let broj = Math.floor(Math.random() * 5);
    let asocijacije = JSON.parse(localStorage.getItem("asocijacije"));
    asocijacija = asocijacije[broj];
    interval = setInterval(tajmer, 1000);
}

function pritisnutoPolje(polje) {
    if(smeDaIgra) {
        smeDaIgra = false;
        dugme = document.getElementById(polje);
        dugme.innerHTML = asocijacija[polje];
        dugme.disabled = true;
        dugme.style.color = 'white';
        dugme.style.border = 'solid white'
        if(naPotezu == 1) dugme.style.backgroundColor = '#1ea1de';
        else dugme.style.backgroundColor = '#D01B1B';
    }
}

function tajmer() {
    vreme++;
    document.getElementById("tajmer").innerHTML = Math.floor(vreme / 60) + ":" + (vreme % 60);
    igrac1 = document.getElementById("igrac1");
    igrac2 = document.getElementById("igrac2");
    if(naPotezu == 1) {
        vreme1--;
        if(vreme1 == 0) {
            vreme1 = 0;
            vreme2 = 10;
            naPotezu = 2;
            smeDaIgra = true;
            igrac2.innerHTML = ime2 + ": " + vreme2;
            igrac1.style.border = "none";
            igrac2.style.border = "4px solid white";
        }
        igrac1.innerHTML = ime1 + ": " + vreme1;
    }
    else {
        vreme2--;
        if(vreme2 == 0) {
            vreme2 = 0;
            vreme1 = 10;
            naPotezu = 1;
            smeDaIgra = true;
            igrac1.innerHTML = ime1 + ": " + vreme1;
            igrac2.style.border = "none";
            igrac1.style.border = "4px solid white";
        }
        igrac2.innerHTML = ime2 + ": " + vreme2;
    }
    if(vreme == 240) {
        otvori_polja("F")
        zavrsi_igru();
        alert("Igra je gotova, isteklo vam je vreme.")
    }
}

function zavrsi_igru() {
    igraGotova = true;
    clearInterval(interval);
    document.getElementById("igrac1").innerHTML = ime1 + ": " + poeni1 + " poena";
    document.getElementById("igrac2").innerHTML = ime2 + ": " + poeni2 + " poena";
    document.getElementById("igrac1").style.border = "none";
    document.getElementById("igrac2").style.border = "none";
    if(poeni1 != poeni2) setInterval(blinka, 1000);
    polja = document.getElementsByClassName("polje");
}

let ivica = false;
function blinka() {
    if(ivica) {
        if(poeni1>poeni2) document.getElementById("igrac1").style.border = "none";
        else document.getElementById("igrac2").style.border = "none";
        ivica = false;
    } 
    else {
        if(poeni1>poeni2) document.getElementById("igrac1").style.border = "4px solid white";
        else document.getElementById("igrac2").style.border = "4px solid white";
        ivica = true;
    }
}

function dalje() {
    if(igraGotova) return;
    smeDaIgra = true;
    if(naPotezu == 1) {
        vreme1 = 0;
        vreme2 = 10;
        naPotezu = 2;
        igrac1.innerHTML = ime1 + ": " + vreme1;
        igrac2.innerHTML = ime2 + ": " + vreme2;
        igrac1.style.border = "none";
        igrac2.style.border = "4px solid white";
    }
    else {
        vreme2 = 0;
        vreme1 = 10;
        naPotezu = 1;
        igrac1.innerHTML = ime1 + ": " + vreme1;
        igrac2.innerHTML = ime2 + ": " + vreme2;
        igrac2.style.border = "none";
        igrac1.style.border = "4px solid white";
    }
}

function uneto(id) {
    polje = document.getElementById(id);
    if(asocijacija[id] == polje.value.toUpperCase()) {
        if(id == "F") {
            if(naPotezu == 1) poeni1 += 10 + broj_neotvorenih_polja(id);
            else poeni2 += 10 + broj_neotvorenih_polja(id); 
            otvori_polja(id);
            zavrsi_igru();
        } else {
            if(naPotezu == 1) poeni1 += 5 + broj_neotvorenih_polja(id);
            else poeni2 += 5 + broj_neotvorenih_polja(id);
            otvori_polja(id);
            dalje();
        }
    } else {
        polje.value = "";
        dalje();
    }
}

function broj_neotvorenih_polja(id) {
    cnt = 0;
    if(id == "F") polja = document.getElementsByClassName("polje");
    else polja = document.getElementsByClassName(id);
    for(let i = 0; i < polja.length; i++) {
        if(polja[i].nodeName=="BUTTON" && polja[i].disabled == false)
            cnt++;
    }
    return cnt;
}

function otvori_polja(id) {
    let trenutni_igrac;
    if(id == "F") {
        polja = document.getElementsByClassName("polje");
        trenutni_igrac = (poeni1 > poeni2) ? 1 : 2;
        if(poeni1 == poeni2) trenutni_igrac = 0;
    } else { 
        polja = document.getElementsByClassName(id);
        trenutni_igrac = naPotezu;
    }
    for(let i = 0; i < polja.length; i++) {
        if(trenutni_igrac == 0) {
            polja[i].style.backgroundColor = '#e2eace';
            polja[i].style.color = 'black';
            polja[i].style.border = 'solid black';
        }
        else {
            if(trenutni_igrac == 1) polja[i].style.backgroundColor = '#1ea1de';
            else polja[i].style.backgroundColor = '#D01B1B';
            polja[i].style.color = 'white';
            polja[i].style.border = 'solid white';
        }
        polja[i].disabled = true;
        if(polja[i].nodeName=="BUTTON") polja[i].innerHTML = asocijacija[polja[i].id];
        else polja[i].value = asocijacija[polja[i].id];
    }
}