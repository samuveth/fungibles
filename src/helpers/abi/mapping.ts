export function getFunctionNames(key: string) {
  if (key === 'jelli') {
    return {
      mushroomCount: 'medusaCount',
      mushroomOfOwnerByIndex: 'medusaOfOwnerByIndex',
      sporesDegree: 'polypsDegree'
    }
  }
  if (key === 'froggi') {
    return {
      mushroomCount: 'inscriptionCount',
      mushroomOfOwnerByIndex: 'inscriptionOfOwnerByIndex',
      sporesDegree: 'dynamicInscription'
    }
  }
  return {
    mushroomCount: 'mushroomCount',
    mushroomOfOwnerByIndex: 'mushroomOfOwnerByIndex',
    sporesDegree: 'sporesDegree'
  }
}
