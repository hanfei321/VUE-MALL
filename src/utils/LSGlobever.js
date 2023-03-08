export function getviewer() {
  const viewer = new LSGlobe.Viewer('lsGlobe', {
    guid: 2065914777,
    licenseUrl: 'http://101.200.199.135:12358/pconvert/api/license/v1/',
    targetFrameRate: 120,
    // licenseUrl: wish3DEarthLicenseUrl
  });
  return viewer;
}
