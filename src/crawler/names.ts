const firstNames = [
  "Liam", "Olivia", "Noah", "Emma", "Oliver", "Ava", "Elijah", "Charlotte", "James", "Sophia",
  "William", "Amelia", "Benjamin", "Isabella", "Lucas", "Mia", "Henry", "Luna", "Alexander", "Harper",
  "Mason", "Evelyn", "Michael", "Ella", "Ethan", "Aria", "Logan", "Chloe", "Daniel", "Scarlett",
  "Jackson", "Grace", "Sebastian", "Lily", "Jack", "Zoe", "Aiden", "Abigail", "Samuel", "Layla",
  "Matthew", "Nora", "David", "Hannah", "Joseph", "Avery", "Lucas", "Addison", "Carter", "Eleanor",
  "Ezra", "Riley", "Luke", "Sofia", "Jayden", "Aubrey", "Leo", "Ellie", "Gabriel", "Ariana",
  "Julian", "Elizabeth", "Isaac", "Penelope", "Lincoln", "Victoria", "Anthony", "Madison", "Dylan", "Scarlett",
  "Leo", "Grace", "Jaxon", "Nova", "Asher", "Camila", "Christopher", "Hazel", "Josiah", "Aurora",
  "Isaiah", "Zara", "Charles", "Paisley", "Xavier", "Stella", "Joshua", "Savannah", "Jeremiah", "Maya",
  "Nicholas", "Natalie", "Archer", "Audrey", "Adrian", "Brooklyn", "Hunter", "Leah", "Theodore", "Lucy",
  "Santiago", "Kinsley", "Caleb", "Isabelle", "Eli", "Lillian", "Grayson", "Anna", "Jordan", "Bella",
  "Colton", "Genesis", "Aaron", "Emilia", "Henry", "Valentina", "Mateo", "Willow", "Landon", "Isla",
  "Miles", "Elena", "Evan", "Lyla", "Arlo", "Mya", "Jace", "Aaliyah", "Cooper", "Melanie",
  "Justin", "Athena", "Austin", "Mackenzie", "Alex", "Amara", "Adriel", "Alexa", "Owen", "Aria",
  "Leon", "Violet", "Zane", "Hannah", "Christian", "Zoey", "Adrian", "Madeline", "Thomas", "Maria",
  "Chase", "Rachel", "Bryson", "Gabriella", "Juan", "Brianna", "Ayden", "Ruby", "Kevin", "Nina",
  "Carlos", "Kennedy", "Bryan", "Daisy", "Jamie", "Lydia", "Carson", "Jade", "Jeremiah", "Brielle",
  "Hunter", "Aubree", "Maddox", "Faith", "Miguel", "Cora", "Harrison", "Katherine", "Tristan", "Annabelle",
  "Parker", "Elliana", "Cole", "Liliana", "Dominic", "Giselle", "Avery", "Alexandra", "Maverick", "Ivy",
  "Ian", "Josephine", "Colin", "Lila", "Elias", "Esther", "Brian", "Nicole", "Levi", "Lucia",
  "Ezekiel", "Valerie", "Alexis", "Megan", "Xander", "Amy", "Patrick", "Rebecca", "Kaden", "Kylie"
];

const surnames = [
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Miller", "Davis", "Garcia", "Rodriguez", "Martinez",
  "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin",
  "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson",
  "Walker", "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores",
  "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell", "Carter", "Roberts",
  "Gomez", "Phillips", "Evans", "Turner", "Diaz", "Parker", "Cruz", "Edwards", "Collins", "Reyes",
  "Stewart", "Morris", "Morales", "Murphy", "Cook", "Rogers", "Gutierrez", "Ortiz", "Morgan", "Cooper",
  "Peterson", "Bailey", "Reed", "Kelly", "Howard", "Ramos", "Kim", "Cox", "Ward", "Richardson",
  "Watson", "Brooks", "Chavez", "Wood", "James", "Bennett", "Gray", "Mendoza", "Ruiz", "Hughes",
  "Price", "Alvarez", "Castillo", "Sanders", "Patel", "Myers", "Long", "Ross", "Foster", "Jimenez",
  "Powell", "Jenkins", "Perry", "Russell", "Sullivan", "Bell", "Coleman", "Butler", "Henderson", "Barnes",
  "Gonzales", "Fisher", "Vasquez", "Simmons", "Romero", "Jordan", "Patterson", "Alexander", "Hamilton", "Graham",
  "Reynolds", "Griffin", "Wallace", "Moreno", "West", "Cole", "Hayes", "Bryant", "Herrera", "Gibson",
  "Ellis", "Tran", "Medina", "Aguilar", "Stevens", "Murray", "Ford", "Castro", "Marshall", "Owens",
  "Harrison", "Fernandez", "Washington", "Kennedy", "Wells", "Alvarez", "Woods", "Mendoza", "Castillo", "Olson",
  "Webb", "Washington", "Santos", "Estrada", "Porter", "Cohen", "Bishop", "Choi", "Carr", "Freeman",
  "Love", "Bryant", "Murray", "Davidson", "Gardner", "Stone", "Carlson", "Warren", "Williamson", "Hansen",
  "Sanders", "Fowler", "Perez", "Kim", "Sims", "Carrillo", "Vargas", "Morrow", "Rios", "Allen",
  "Wagner", "Willis", "Stevens", "Beck", "Daniels", "Owens", "Henry", "Holland", "Lane", "Carpenter",
  "Fields", "Luna", "Harper", "Austin", "Garcia", "Reeves", "Soto", "Wade", "Fisher", "Munoz"
];

export function generateRandomFullName() {
  const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const randomSurname = surnames[Math.floor(Math.random() * surnames.length)];
  return randomFirstName + " " + randomSurname;
}