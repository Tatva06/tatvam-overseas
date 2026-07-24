const fs = require('fs');
const path = require('path');

const dir = '.';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') || f.endsWith('.xml'));
const jsDir = path.join(dir, 'js');
const jsFiles = fs.readdirSync(jsDir).filter(f => f.endsWith('.js')).map(f => path.join('js', f));

const allFiles = [...files, ...jsFiles];

for (const file of allFiles) {
    if (fs.statSync(file).isDirectory()) continue;
    let content = fs.readFileSync(file, 'utf8');
    
    // 1. Phone number replacements
    content = content.replace(/\+91 98696 07960/g, '+91 90828 34775');
    content = content.replace(/\+919869607960/g, '+919082834775');
    content = content.replace(/9869607960/g, '9082834775');
    content = content.replace(/\+91 9869607960/g, '+91 9082834775');
    content = content.replace(/98696 07960/g, '90828 34775');
    
    // 2. Email replacements
    content = content.replace(/sales@tatvamoverseas\.com/g, 'sales@tatvamoverseasinc.com');
    
    // 3. Name replacements
    content = content.replace(/Tatvam Overseas(?! Inc|Inc| Inc.)/g, 'Tatvam Overseas Inc');
    
    // 4. Catalog replacement
    content = content.replace(/Tatvam_Catalog_2025\.pdf/g, 'TatvamOverseasInc_Catalog_2025.pdf');
    
    // 5. Domain replacement
    content = content.replace(/https:\/\/tatvamoverseas\.com/g, 'https://tatvamoverseasinc.com');
    content = content.replace(/www\.tatvamoverseas\.com/g, 'www.tatvamoverseasinc.com');

    fs.writeFileSync(file, content, 'utf8');
}
console.log('Brand identity unified across ' + allFiles.length + ' files.');
