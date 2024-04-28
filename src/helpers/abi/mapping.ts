const STANDARD_ABI_PROJECTS = ['froggi', 'truffi']

export function getFunctionNames(key: string) {
  if (STANDARD_ABI_PROJECTS.includes(key)) {
    return {
      mushroomCount: 'inscriptionCount',
      mushroomOfOwnerByIndex: 'inscriptionOfOwnerByIndex',
      sporesDegree: 'dynamicInscription'
    }
  }
  if (key === 'jelli') {
    return {
      mushroomCount: 'medusaCount',
      mushroomOfOwnerByIndex: 'medusaOfOwnerByIndex',
      sporesDegree: 'polypsDegree'
    }
  }
  return {
    mushroomCount: 'mushroomCount',
    mushroomOfOwnerByIndex: 'mushroomOfOwnerByIndex',
    sporesDegree: 'sporesDegree'
  }
}
