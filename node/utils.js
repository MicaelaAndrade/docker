const getRandomItem = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

export const generateFullName = () => {
  const firstNames = [
    'Lucas',
    'Mariana',
    'Rafael',
    'Camila',
    'Pedro',
    'Larissa',
    'Felipe',
    'Amanda',
    'João',
    'Isabela',
  ];
  const lastNames = [
    'Mendes',
    'Gomes',
    'Barbosa',
    'Vieira',
    'Carvalho',
    'Moreira',
    'Martins',
    'Ribeiro',
    'Sousa',
    'Andrade',
  ];

  const name = getRandomItem(firstNames);
  const lastName = getRandomItem(lastNames);
  return name + ' ' + lastName;
};