```
# 
# MUTATION TO ADD RELATIONS
# mutation createCountrySpecieDistribution(
#   $country: CountryWhereUniqueInput,
#   $specie: SpecieWhereUniqueInput,
#   $year: Int,
#   $value: Float
# ){
#   createCountrySpecieDistribution(data: {
#     specie: {
#       connect: $specie
#     }
#     country: {
#       connect: $country
#     },
#     year: $year,
#     summary: $value
#   }
#   ) {
#     id
#   }
# }
#
# MUTATION TO ADD SPECIES
# mutation createSpecie(
#   $name:String,
#   $scientificName: String!,
#   $slug: String
# ){
#   createSpecie(data: {
#     name: $name,
#     scientificName: $scientificName,
#     wikipediaSlug: $slug
#   }) {
#     id
#   }
# }
#
# QUERY TO CHECK AFTER IMPORT
# {
#   species(where: {
#     countrySpecieDistributions_every: {
#       country: { iso: "TZA" }
#     }
#   }) {
#     name,
#     scientificName,
#     wikipediaSlug
#   }
# }

# mutation createBiovar(
# 	$name:String,
#   $key:String!
# ){
#   createBiovar(data:{
#     name:$name,
#     key:$key
#   }){
#     id
#   }
# }
#
# mutation createCountryBiovarDistribution(
#   $country: CountryWhereUniqueInput,
#   $biovar: BiovarWhereUniqueInput,
#   $scenario: ScenarioWhereUniqueInput,
#   $year:Int,
#   $summary:Float
# ){
#   createCountryBiovarDistribution(data: {
#     biovar: {
#       connect: $biovar
#     },
#     country: {
#       connect: $country
#     },
#     scenario: {
#       connect: $scenario
#     }
#     year: $year,
#     summary: $summary
#   }){
#     id
#   }
# }
# 
# DELETE
# mutation {
#    deleteManyCountrySpecieDistributions(where: {
#      country: {
#        iso: "TZA"
#      }
#    }){
#    count
#  }
# }

# mutation{
#   deleteManySpecies(where: {
#     countrySpecieDistributions_every: {
#       country: {
#         iso: "IDN"
#       }
#     }
#   }){
#    count
#  }
# }
#
#
# CHECK
mutation{
  updateManyCountrySpecieDistributions(where: {
    country: {
      iso: "TZA"
    }
  }, data: {}){
    count
  }
}

#  {
#   countryBiovarDistributions(where: {
#     year: 2050,
#     country: {
#       iso: "PER"
#     },
#     biovar: {
#       key: "biovar19"
#     }
#   }) {
#     id,
# 		summary,
#     scenario {
#       key
#     }
#   }
# }

```
