const Period = require('../models/period');

module.exports = {
  index,
  new: newPeriod,
  create,
  show,
  delete: deletePeriod,
  getCalendar,
};

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

async function getCalendar(req, res) {
  const monthName = monthNames[parseInt(req.params.month) - 1];
  let month = parseInt(req.params.month);
  let year = parseInt(req.params.year);
  const firstDayOfMonth = new Date(year, month - 1, 1);
  const daysInMonth = new Date(year, month, 0).getDate();
  const dateString = firstDayOfMonth.toLocaleDateString("en-us", {
    weekday: "long", // The comma and the space provided here will be used later to split the date
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const paddingDays = weekdays.indexOf(dateString.split(", ")[0]);
  const periods = await Period.find({
    periodDate: {
      $gte: new Date(year, month - 1),
      $lt: new Date(year, month - 1, daysInMonth),
    },
  });
  res.render('periods/index', {periods, monthName, month, year, firstDayOfMonth, daysInMonth, paddingDays});
}

function index(req, res) {
  Period.find({userId: req.user._id}, function(err, periods){
    console.log(periods)
    res.render('periods/index', { periods });
  })
};

function newPeriod(req, res) {
  res.render('periods/new');
};

function create(req, res ) {
  if (req.body.periodDate === '') delete req.body.periodDate;
  req.body.userId = req.user._id;
  const period = new Period(req.body);
  console.log(req.body);
  period.save(function(err) {
    if (err) return res.redirect('/periods/new');
    console.log(period);
    res.redirect('/periods');
  });
};

function show(req,res) {
  Period.findById(req.params.id, function(err, period) {
    res.render('periods/show', { period });
  })
}

function deletePeriod(req, res) {
  Period.findOneAndRemove( {_id: req.params.id, userId: req.user._id }, function(err, period) {
    if(!period.userId.equals(req.user._id)) return redirect('/');
    res.redirect('/periods');
  })
}