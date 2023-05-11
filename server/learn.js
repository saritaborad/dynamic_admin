//  convert string of array of object to array
db.yourCollection.aggregate([
 {
  $addFields: {
   arrayField: {
    $cond: {
     if: { $ne: ["$arrayField", ""] },
     then: {
      $function: {
       body: function (str) {
        return JSON.parse(str);
       },
       args: ["$arrayField"],
       lang: "js",
      },
     },
     else: [],
    },
   },
  },
 },
]);

// version after converting string of array of obj to array
const version = await Version.find({}, { projection: { ad_master: 1, _id: 0, version: 1 }, sort: { "ad_master.adm_date": 1 } }).toArray((err, docs) => {
 if (err) return give_response(res, 400, false, err.message);
});

const version1 = await Version.aggregate([
 {
  $project: {
   _id: 0,
   "ad_master.adm_name": 1,
   "ad_master.ad_chield": {
    $cond: {
     if: { $ne: ["$ad_master", ""] },
     then: {
      $function: {
       body: function (str) {
        const arr = JSON.parse(str);
        return {
         $map: {
          input: arr,
          as: "item",
          in: {
           ad_token: "$$item.ad_token",
           ad_keyword: "$$item.ad_keyword",
           version_Id: "$$item.version_Id",
           enable: "$$item.enable",
           adc_date: "$$item.adc_date",
          },
         },
        };
       },
       args: ["$ad_master"],
       lang: "js",
      },
     },
     else: [],
    },
   },
  },
 },
]).toArray();

//  replacement of version update from string of array of obj
const version2 = Version.updateOne(
 { _id: new ObjectId(version_Id) },
 {
  $pull: { ad_master: { _id: new ObjectId(_id) } },
 },
 function (err, doc) {
  if (err) return give_response(res, 400, false, err.message);
 }
);
const version3 = Version.updateOne(
 { _id: new ObjectId(version_Id) },
 [
  {
   $set: {
    ad_master: {
     $cond: {
      if: { $ne: ["$ad_master", ""] },
      then: {
       $function: {
        body: function (str) {
         const arr = JSON.parse(str);
         return {
          $map: {
           input: arr,
           as: "item",
           in: {
            _id: { $convert: { input: "$$item._id", to: "objectId" } },
            ad_token: "$$item.ad_token",
            ad_keyword: "$$item.ad_keyword",
            version_Id: "$$item.version_Id",
            enable: "$$item.enable",
            adc_date: "$$item.adc_date",
           },
          },
         };
        },
        args: ["$ad_master"],
        lang: "js",
       },
      },
      else: [],
     },
    },
   },
  },
  {
   $pull: { ad_master: { _id: new ObjectId(_id) } },
  },
 ],
 function (err, doc) {
  if (err) return give_response(res, 400, false, err.message);
 }
);
