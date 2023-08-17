https://monosnap.com/file/g1fEUb2VvCgDT3SoRKia69RHsUJPwl

remember! when trying to run module version, change "type":"commonjs" to "type":"module" in package.json file

////////////////////////////

# Otrzymujemy i wyprowadzamy całą listę kontaktów w postaci tabeli (console.table)

node index.js --action list
//
node index_v-module.js --action list

# Otrzymujemy kontakt po id

node index.js --action get --id 05olLMgyVQdWRwgKfg5J6
//
node index_v-module.js --action get --id 05olLMgyVQdWRwgKfg5J6

# Dodajemy kontakt

node index.js --action add --name Mango --email mango_111@agmail.com --phone 322-22-22 (zmienilem, zeby prawdziwy mango sie nie obrazil)
//
node index_v-module.js --action add --name Mango --email mango_111@agmail.com --phone 322-22-22 (zmienilem, zeby prawdziwy mango sie nie obrazil)

# Usuwamy kontakt

node index.js --action remove --id qdggE76Jtbfd9eWJHrssH
//
node index_v-module.js --action remove --id qdggE76Jtbfd9eWJHrssH

# Edycja kontaktu

node index_v-module.js --action edit --id drsAJ4SHPYqZeG-83QTVW
