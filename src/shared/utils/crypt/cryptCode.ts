import crypto from 'crypto';

export default async function generateHash(target:number): Promise<string[]> {

  const hashes: string[] = [];
  const secretWords = JSON.parse(process.env.SECRET_WORDS);

  for (let i = 0; i < 100000; i++) {
    const a = i * 2;
    const b = i + 3;
    const x = i ** 4;
    const y = (i % 7) + 1;
    const z = (i * 75);

    const result = ((((a + b) * y)^x)+z);
    const word = secretWords[i % secretWords.length];
    const base = `${word}-${result}`;
    if(i === target) {
       const hash = crypto.createHash('sha256').update(base).digest('hex');
       hashes.push(hash);
    } 
  }

  return hashes;
}