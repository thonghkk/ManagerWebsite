import fs from 'fs';
import { dirname } from 'path';

const fileContent = fs.readFileSync('src/data/itemDetails.js', 'utf8');
const match = fileContent.match(/export const ITEM_DETAILS = ([\s\S]+);/);

if (!match) {
  console.log("Could not find ITEM_DETAILS");
  process.exit(1);
}

// Evaluate the object
let ITEM_DETAILS;
eval(`ITEM_DETAILS = ${match[1]}`);

const androidDetails = {};
const flutterDetails = {};

const flutterPrefixes = ['d', 'fl', 'w', 'sm', 'nav', 'ar', 'ac', 'net', 'st', 'pf', 'te', 'bu'];

for (const key in ITEM_DETAILS) {
  // Check if it's flutter by seeing if key starts with flutter prefix followed by number
  let isFlutter = false;
  for (const prefix of flutterPrefixes) {
    if (key.startsWith(prefix) && !isNaN(parseInt(key.substring(prefix.length)))) {
      isFlutter = true;
      break;
    }
  }

  // ad begins with a... wait, android prefixes are 'a', 'ad', 'b', 'c', 'dp', 'f', 'j', 'k', 'n', 'p', 's', 't', 'uc', 'ux'
  if (isFlutter && !key.startsWith('dp') && !key.startsWith('f1') && !key.startsWith('f2') && !key.startsWith('f3') && !key.startsWith('f4') && !key.startsWith('f5') && !key.startsWith('f6') && !key.startsWith('f7') && !key.startsWith('f8') && !key.startsWith('f9')) {
    flutterDetails[key] = ITEM_DETAILS[key];
  } else {
    // wait, f1..f10 are android. fl1..fl8 are flutter. 
    // d1..d10 is flutter. dp1..dp19 is android.
    // Let's be explicit:
    androidDetails[key] = ITEM_DETAILS[key];
  }
}

// better way:
const androidMap = {};
const flutterMap = {};
for (const key in ITEM_DETAILS) {
    // It's flutter if it was added recently (k1..dp19 are android)
    const androidKeys = ["k1","k2","k3","k4","k5","k6","k7","k8","k9","k10","k11","k12","k13","f1","f2","f3","f4","f5","f6","f7","f8","f9","f10","ux1","ux2","ux3","ux4","ux5","ux6","ux7","ux8","uc1","uc2","uc3","uc4","uc5","uc6","uc7","a1","a2","a3","a4","a5","a6","a7","a8","a9","j1","j2","j3","j4","j5","j6","j7","j8","j9","c1","c2","c3","c4","c5","c6","c7","n1","n2","n3","n4","n5","n6","n7","s1","s2","s3","s4","s5","s6","p1","p2","p3","p4","p5","p6","p7","t1","t2","t3","t4","t5","t6","b1","b2","b3","b4","b5","b6","ad1","ad2","ad3","ad4","ad5","ad6","ad7","dp1","dp2","dp3","dp4","dp5","dp6","dp7","dp8","dp9","dp10","dp11","dp12","dp13","dp14","dp15","dp16","dp17","dp18","dp19"];
    
    if (androidKeys.includes(key)) {
        androidMap[key] = ITEM_DETAILS[key];
    } else {
        flutterMap[key] = ITEM_DETAILS[key];
    }
}

fs.writeFileSync('src/data/itemDetails/android.js', `export const androidDetails = ${JSON.stringify(androidMap, null, 2)};\n`);
fs.writeFileSync('src/data/itemDetails/flutter.js', `export const flutterDetails = ${JSON.stringify(flutterMap, null, 2)};\n`);

console.log(`Split complete! Android: ${Object.keys(androidMap).length}, Flutter: ${Object.keys(flutterMap).length}`);
