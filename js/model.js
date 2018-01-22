function AppModel() {
  this.map = ko.observable({
    center: {lat: -37.821410, lng: 144.959343},
    zoom: 15
  });
  this.places = ko.observableArray([
    {
      name: 'Coles Southbank', 
      location: {lat: -37.832107, lng: 144.960530},
      // location: '251-255 Clarendon St (btwn Coventry St. & Dorcas St.) South Melbourne VIC 3205 Australia',
      category: 'groceries'
    },
    {
      name: 'Coles Melbourne',
      location: {lat: -37.817676, lng: 144.965087},
      // location: '26 Elizabeth St (Btwn Flinders St & Flinders Ln) Melbourne VIC 3000 Australia',
      category: 'groceries'
    },
    {
      name: 'Minotaur',
      location: {lat: -37.815495, lng: 144.963529},
      // location: '121 Elizabeth St. (Btw Collins St. & Bourke St.), Melbourne',
      category: 'geeks'
    },
    {
      name: 'Critical Hit',
      location: {lat: -37.815876, lng: 144.962470},
      // location: '377 Little Collins St., Melbourne',
      category: 'geeks'
    },
    {
      name: 'All Star Comics', 
      location: {lat: -37.817532, lng: 144.961568},
      // location: '53 Queen Street, Melbourne',
      category: 'geeks'
    },
    {
      name: 'Stalactites',
      location: {lat: -37.811151, lng: 144.967080},
      // location: '183 Lonsdale St (at Russell St) Melbourne',
      category: 'restorant'
    },
    {
      name: 'Rare Steakhouse',
      location: {lat: -37.819183, lng: 144.957340},
      // location: '42-44 King St (At Flinders Ln) Melbourne',
      category: 'restorant'
    },
    {
      name: 'ShanDong MaMa', 
      location: {lat: -37.812815, lng: 144.967418},
      // location: 'Shop 7-8, 194-200 Bourke St, Melbourne',
      category: 'restorant'
    }
  ]);
}