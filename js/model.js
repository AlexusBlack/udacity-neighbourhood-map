function AppModel() {
  this.places = ko.observableArray([
    {
      name: 'Coles Southbank', 
      location: '251-255 Clarendon St (btwn Coventry St. & Dorcas St.) South Melbourne VIC 3205 Australia',
      category: 'groceries'
    },
    {
      name: 'Coles Melbourne', 
      location: '26 Elizabeth St (Btwn Flinders St & Flinders Ln) Melbourne VIC 3000 Australia',
      category: 'groceries'
    },
    {
      name: 'Minotaur', 
      location: '121 Elizabeth St. (Btw Collins St. & Bourke St.), Melbourne',
      category: 'geeks'
    },
    {
      name: 'Critical Hit', 
      location: '377 Little Collins St., Melbourne',
      category: 'geeks'
    },
    {
      name: 'All Star Comics', 
      location: '53 Queen Street, Melbourne',
      category: 'geeks'
    },
    {
      name: 'Stalactites', 
      location: '183 Lonsdale St (at Russell St) Melbourne',
      category: 'restorant'
    },
    {
      name: 'Rare Steakhouse', 
      location: '42-44 King St (At Flinders Ln) Melbourne',
      category: 'restorant'
    },
    {
      name: 'ShanDong MaMa', 
      location: 'Shop 7-8, 194-200 Bourke St, Melbourne',
      category: 'restorant'
    }
  ]);
}