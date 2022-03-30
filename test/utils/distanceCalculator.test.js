const distanceFromLondon = require('../../app/utils/distanceCalculator');

describe('distanceCalculator', () => {
  it('should return the distance between london and manchester as being greater than 160 miles', async () => {
    const manchester = {
      latitude: 53.485097069530546,
      longitude: -2.2437203995384487,
    };
    const distance = distanceFromLondon(manchester);

    expect(distance).toBeGreaterThan(160);
  });

  it('should return the distance between london and luton as being less than 30 miles', async () => {
    const luton = {
      latitude: 51.8783703944877,
      longitude: -0.42038421449594304,
    };
    const distance = distanceFromLondon(luton);

    expect(distance).toBeLessThan(30);
  });

  it('should return the distance between london and wembley as being less than 10 miles', async () => {
    const wembley = {
      latitude: 51.550878614953184,
      longitude: -0.30482730443792905,
    };
    const distance = distanceFromLondon(wembley);

    expect(distance).toBeLessThan(10);
  });
});
