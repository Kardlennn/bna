

async function testTurevSave() {
  const url = new URL('http://sistemjson1.trvrac.com/JsonRez_Save.aspx');
  url.searchParams.append('Key_Hack', 'c8b14555-fc02-436c-8ea6-ecb873fa2f7d');
  url.searchParams.append('User_Name', 'bnawebpl9f03mv1');
  url.searchParams.append('User_Pass', 'jp1rms98pfovt11');
  
  // Fake reservation data (we need real ones from a search result, but let's see what happens)
  const params = {
    Rez_ID: '8_a85d836', // Usually changes, but we'll try
    Cars_Park_ID: '1',
    Group_ID: '34',
    Pickup_ID: '1',
    Drop_Off_ID: '1',
    Name: 'Test',
    SurName: 'Testoglu',
    MobilePhone: '05555555555',
    Mail_Adress: 'test@test.com',
    Rental_ID: '0',
    Your_Rez_ID: 'WEB-12345',
    Pickup_Day: '15', Pickup_Month: '09', Pickup_Year: '2026', Pickup_Hour: '10', Pickup_Min: '00',
    Drop_Off_Day: '17', Drop_Off_Month: '09', Drop_Off_Year: '2026', Drop_Off_Hour: '10', Drop_Off_Min: '00',
    Currency: 'TL',
    Payment_Type: '0' // Adding this just in case
  };

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.append(key, value);
  }

  console.log("URL:", url.toString());
  try {
    const res = await fetch(url.toString());
    const text = await res.text();
    console.log("STATUS:", res.status);
    console.log("RESPONSE:", text);
  } catch(e) {
    console.error("ERROR:", e);
  }
}

testTurevSave();
