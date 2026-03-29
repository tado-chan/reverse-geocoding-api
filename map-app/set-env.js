const fs = require('fs');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '../.env') });

const content = `// このファイルは set-env.js により自動生成されます。直接編集しないでください。
export const environment = {
  production: false,
  googleMapsApiKey: '${process.env.GOOGLE_MAPS_API_KEY ?? ''}',
};
`;

fs.writeFileSync(path.join(__dirname, 'src/environments/environment.ts'), content);
console.log('environment.ts を .env から生成しました');
