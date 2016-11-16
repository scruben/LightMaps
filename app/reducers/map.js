const mapState = (
  state = {
    panels: [],
    statusError: ''
  },
  action
) => {
  switch (action.type) {
  case 'GET_PANELS_SUCCESS': {
    let annotations = action.response.map((el)=>{
      return {
        id: el.identifier,
        type: 'point',
        coordinates: [el.latitude,el.longitude],
        title: el.identifier,
        subtitle: `Total power: ${el.totalPower} W\n# Incidents: ${el.totalIncidences}`,
        annotationImage: {
          source: { uri: 'control' },
          height: 30,
          width: 30
        },
      };
    });
    var points = [2.196512699989881,41.39330619921518,0,2.196650163501375,41.39359686779306,0,2.197020709866246,41.39367783292879,0,2.197024464377229,41.39397151642724,0,2.19753055287254,41.3939855022111,0,2.197473301064505,41.39420068770381,0,2.197803589035778,41.39430752713419,0,2.197989708438528,41.39457254671647,0,2.198335831904477,41.39457756271057,0,2.198374629138162,41.394936202509,0,2.198679614230983,41.39492752485761,0,2.198832127630892,41.39519815865039,0,2.199224037547451,41.39533506402035,0,2.199232000394773,41.39560337942486,0,2.199660209078984,41.39560262974804,0];
    for (var i = 0; i < points.length; i += 3) {
      annotations.unshift({
        id: `P-01-${i}`,
        type: 'point',
        coordinates: [points[i+1],points[i]],
        title: `P-01-${i}`,
        subtitle: `Power: 150 W\nHeight: 8 m`,
        annotationImage: {
          source: { uri: 'point' },
          height: 15,
          width: 15
        },
      });
    }
    state.panels = annotations;
    return state;
  }
  case 'GET_PANELS_FAILURE':
    return Object.assign({}, state, {
      // statusError: 'Error loading panels.'
      statusError: action.error
    });
  case 'GET_PANELS_REQUEST':
    return Object.assign({}, state, {
      statusError: '' // we clear the status error
    });
  default:
    return state;
  }
};

export default mapState;
