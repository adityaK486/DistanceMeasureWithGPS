let CURRENT_LOCATION=null;
let A=null;
let B=null;
function main(){
    let geolocaton=null;
    if(window.navigator && window.navigator.geolocation){
        geolocaton = window.navigator.geolocation;
    }
    if(geolocaton){
        geolocaton.watchPosition(onLocationUpdate,onError,{
            enableHighAccuracy:true,
            maximumAge:1000
        })
    }else{
        alert("Cannot access location");
    }
}

function onLocationUpdate(event){
    CURRENT_LOCATION=event.coords;
    document.getElementById('loc').innerHTML=
        "Your location:<br>Lat : "+CURRENT_LOCATION.latitude+"<br>Lon: "+CURRENT_LOCATION.longitute;
    
}

function onError(err){
    alert("Cannot access location"+err);
}

function setA(){
    A=CURRENT_LOCATION;
    updateInfo();
}

function setB(){
    B=CURRENT_LOCATION;
    updateInfo();
}

function updateInfo(){
    if(A!=null){
        document.getElementById('aBtn').innerHTML=A.latitude+
        "<br>"+A.longitute;
    }

    if(B!=null){
        document.getElementById('bBtn').innerHTML=B.latitude+
        "<br>"+B.longitute;
    }

    if(A!=null && B!=null){
        let dist=getDistance(A,B);
        document.getElementById('info').innerHTML=
        "distance:"+dist+"meters"
    }
}

function latlonToXYZ(latlon,R){
    const xyz={x:0,y:0,z:0};
    xyz.y=Math.sin(degToRad(latlon.latitude))*R;
    const r=Math.cos(degToRad(latlon.latitude))*R;
    xyz.x=Math.sin(degToRad(latlon.longitute))*r;
    xyz.z=Math.cos(degToRad(latlon.longitute))*r;
    return xyz;
}

function degToRad(degree){
    return degree*Math.PI/180;
}

function getDistance(latlon1,latlon2){
    const R=6371000;
    const xyz1=latlonToXYZ(latlon1,R);
    const xyz2=latlonToXYZ(latlon2,R);
    const eucl=euclidean(xyz1,xyz2);
    return eucl;
}

function euclidean(p1,p2){
    return Math.sqrt(
        (p1.x-p2.x)*(p1.x-p2.x)+
        (p1.y-p2.y)*(p1.y-p2.y)+
        (p1.z-p2.z)*(p1.z-p2.z)
    )
}