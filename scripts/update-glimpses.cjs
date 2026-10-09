const fs = require('fs');
const file = 'src/components/akhom/Glimpses.tsx';
let c = fs.readFileSync(file, 'utf8');
const regex = /<img\s+src=\{g4\}[\s\S]*?\/>/;
const replacement = `<motion.img
                src={g4}
                alt="Architectural kitchen island in honed dark stone with fluted oak cabinetry"
                className="h-full w-full object-cover rounded-3xl transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                loading="lazy"
                decoding="async"
                whileHover={{ scale: 1.05 }}
              />`;

if (regex.test(c)) {
  c = c.replace(regex, replacement);
  fs.writeFileSync(file, c, 'utf8');
  console.log('Successfully updated Glimpses.tsx closing image to motion.img with rounded-3xl!');
} else {
  console.log('Regex did not match');
}
