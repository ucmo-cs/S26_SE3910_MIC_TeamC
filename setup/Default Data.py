import requests

BASE_URL = "http://localhost:8080/api"

def post(endpoint, data):
    response = requests.post(f"{BASE_URL}/{endpoint}", json=data)
    response.raise_for_status()
    return response.json()

# Seed branches
branch1 = post("branches", { "name": "East Branch", "address": "410 East Market St, Kansas City, MO"})
branch2 = post("branches", { "name": "West Branch", "address": "990 West Oak Blvd, Kansas City, MO"})
branch3 = post("branches", { "name": "North Branch", "address": "1201 North Main St, Kansas City, MO"})
branch4 = post("branches", { "name": "South Branch", "address": "845 South Plaza Ave, Kansas City, MO"})

# Seed topics
topic1 = post("topics", { "name": "Account Opening", "description": "Open a new personal or business bank account.", "icon": 1})
topic2 = post("topics", { "name": "Loan Application", "description": "Discuss loan options and start your application.", "icon": 2})
topic3 = post("topics", { "name": "Credit Card Application", "description": "Apply for a credit card that fits your needs.", "icon": 3})
topic4 = post("topics", { "name": "General Inquiry", "description": "Ask questions about banking services and support.", "icon": 4})
topic5 = post("topics", { "name": "Account Problem", "description": "Get help with account issues or service concerns.", "icon": 5})

# Create Branch-Topics from branches and topics
branchTopic1 = post("branchtopics", { "branch": { "id": branch1['id'] }, "topic": { "id": topic1['id'] } })
branchTopic2 = post("branchtopics", { "branch": { "id": branch1['id'] }, "topic": { "id": topic2['id'] } })
branchTopic3 = post("branchtopics", { "branch": { "id": branch1['id'] }, "topic": { "id": topic4['id'] } })
branchTopic4 = post("branchtopics", { "branch": { "id": branch1['id'] }, "topic": { "id": topic5['id'] } })

branchTopic5 = post("branchtopics", { "branch": { "id": branch2['id'] }, "topic": { "id": topic1['id'] } })
branchTopic6 = post("branchtopics", { "branch": { "id": branch2['id'] }, "topic": { "id": topic3['id'] } })
branchTopic7 = post("branchtopics", { "branch": { "id": branch2['id'] }, "topic": { "id": topic4['id'] } })
branchTopic8 = post("branchtopics", { "branch": { "id": branch2['id'] }, "topic": { "id": topic5['id'] } })

post("branchtopics", { "branch": { "id": branch3['id'] }, "topic": { "id": topic1['id'] } })
post("branchtopics", { "branch": { "id": branch3['id'] }, "topic": { "id": topic2['id'] } })
post("branchtopics", { "branch": { "id": branch3['id'] }, "topic": { "id": topic3['id'] } })
post("branchtopics", { "branch": { "id": branch3['id'] }, "topic": { "id": topic4['id'] } })
post("branchtopics", { "branch": { "id": branch3['id'] }, "topic": { "id": topic5['id'] } })

post("branchtopics", { "branch": { "id": branch4['id'] }, "topic": { "id": topic2['id'] } })
post("branchtopics", { "branch": { "id": branch4['id'] }, "topic": { "id": topic4['id'] } })
post("branchtopics", { "branch": { "id": branch4['id'] }, "topic": { "id": topic5['id'] } })

# Create example users
user1 = post("users", {"name": "Keelan Schmidt", "email": "example@gmail.com"})
user2 = post("users", {"name": "John Smith", "email": "j.test2@gmail.com"})

# Create example appointments
post("appointments", {"user": {"id": user1['id']},"branchTopic": {"id": branchTopic1['id']},
        "startTime": "2026-04-30T13:30:00",
        "reason": "I would like to open a new account and transfer from my previous account with another bank.",
        "phoneNumber": "1234567890"
    })

post("appointments", {"user": {"id": user2['id']},"branchTopic": {"id": branchTopic6['id']},
        "startTime": "2026-04-30T13:00:00",
        "reason": "Applying for new credit card.",
        "phoneNumber": "1112223333"
    })

# Seed branch times
post("branchtimes/bulk", [
  #East Branch

  #Monday
  { "branch": { "id": branch1['id'] }, "dayOfWeek": "MONDAY", "availableTime": "09:00:00" },
  { "branch": { "id": branch1['id'] }, "dayOfWeek": "MONDAY", "availableTime": "09:30:00" },
  { "branch": { "id": branch1['id'] }, "dayOfWeek": "MONDAY", "availableTime": "10:00:00" },
  { "branch": { "id": branch1['id'] }, "dayOfWeek": "MONDAY", "availableTime": "10:30:00" },
  { "branch": { "id": branch1['id'] }, "dayOfWeek": "MONDAY", "availableTime": "11:00:00" },
  { "branch": { "id": branch1['id'] }, "dayOfWeek": "MONDAY", "availableTime": "11:30:00" },
  { "branch": { "id": branch1['id'] }, "dayOfWeek": "MONDAY", "availableTime": "12:00:00" },
  { "branch": { "id": branch1['id'] }, "dayOfWeek": "MONDAY", "availableTime": "12:30:00" },
  { "branch": { "id": branch1['id'] }, "dayOfWeek": "MONDAY", "availableTime": "13:00:00" },
  { "branch": { "id": branch1['id'] }, "dayOfWeek": "MONDAY", "availableTime": "13:30:00" },
  { "branch": { "id": branch1['id'] }, "dayOfWeek": "MONDAY", "availableTime": "14:00:00" },
  { "branch": { "id": branch1['id'] }, "dayOfWeek": "MONDAY", "availableTime": "14:30:00" },
  { "branch": { "id": branch1['id'] }, "dayOfWeek": "MONDAY", "availableTime": "15:00:00" },

  #Tuesday
  { "branch": { "id": branch1['id'] }, "dayOfWeek": "TUESDAY", "availableTime": "09:00:00" },
  { "branch": { "id": branch1['id'] }, "dayOfWeek": "TUESDAY", "availableTime": "09:30:00" },
  { "branch": { "id": branch1['id'] }, "dayOfWeek": "TUESDAY", "availableTime": "10:00:00" },
  { "branch": { "id": branch1['id'] }, "dayOfWeek": "TUESDAY", "availableTime": "10:30:00" },
  { "branch": { "id": branch1['id'] }, "dayOfWeek": "TUESDAY", "availableTime": "11:00:00" },
  { "branch": { "id": branch1['id'] }, "dayOfWeek": "TUESDAY", "availableTime": "11:30:00" },
  { "branch": { "id": branch1['id'] }, "dayOfWeek": "TUESDAY", "availableTime": "12:00:00" },
  { "branch": { "id": branch1['id'] }, "dayOfWeek": "TUESDAY", "availableTime": "12:30:00" },
  { "branch": { "id": branch1['id'] }, "dayOfWeek": "TUESDAY", "availableTime": "13:00:00" },
  { "branch": { "id": branch1['id'] }, "dayOfWeek": "TUESDAY", "availableTime": "13:30:00" },
  { "branch": { "id": branch1['id'] }, "dayOfWeek": "TUESDAY", "availableTime": "14:00:00" },
  { "branch": { "id": branch1['id'] }, "dayOfWeek": "TUESDAY", "availableTime": "14:30:00" },
  { "branch": { "id": branch1['id'] }, "dayOfWeek": "TUESDAY", "availableTime": "15:00:00" },

  #Wednesday
  { "branch": { "id": branch1['id'] }, "dayOfWeek": "WEDNESDAY", "availableTime": "09:00:00" },
  { "branch": { "id": branch1['id'] }, "dayOfWeek": "WEDNESDAY", "availableTime": "09:30:00" },
  { "branch": { "id": branch1['id'] }, "dayOfWeek": "WEDNESDAY", "availableTime": "10:00:00" },
  { "branch": { "id": branch1['id'] }, "dayOfWeek": "WEDNESDAY", "availableTime": "10:30:00" },
  { "branch": { "id": branch1['id'] }, "dayOfWeek": "WEDNESDAY", "availableTime": "11:00:00" },
  { "branch": { "id": branch1['id'] }, "dayOfWeek": "WEDNESDAY", "availableTime": "11:30:00" },
  { "branch": { "id": branch1['id'] }, "dayOfWeek": "WEDNESDAY", "availableTime": "12:00:00" },
  { "branch": { "id": branch1['id'] }, "dayOfWeek": "WEDNESDAY", "availableTime": "12:30:00" },
  { "branch": { "id": branch1['id'] }, "dayOfWeek": "WEDNESDAY", "availableTime": "13:00:00" },
  { "branch": { "id": branch1['id'] }, "dayOfWeek": "WEDNESDAY", "availableTime": "13:30:00" },
  { "branch": { "id": branch1['id'] }, "dayOfWeek": "WEDNESDAY", "availableTime": "14:00:00" },
  { "branch": { "id": branch1['id'] }, "dayOfWeek": "WEDNESDAY", "availableTime": "14:30:00" },
  { "branch": { "id": branch1['id'] }, "dayOfWeek": "WEDNESDAY", "availableTime": "15:00:00" },

  #Thursday
  { "branch": { "id": branch1['id'] }, "dayOfWeek": "THURSDAY", "availableTime": "09:00:00" },
  { "branch": { "id": branch1['id'] }, "dayOfWeek": "THURSDAY", "availableTime": "09:30:00" },
  { "branch": { "id": branch1['id'] }, "dayOfWeek": "THURSDAY", "availableTime": "10:00:00" },
  { "branch": { "id": branch1['id'] }, "dayOfWeek": "THURSDAY", "availableTime": "10:30:00" },
  { "branch": { "id": branch1['id'] }, "dayOfWeek": "THURSDAY", "availableTime": "11:00:00" },
  { "branch": { "id": branch1['id'] }, "dayOfWeek": "THURSDAY", "availableTime": "11:30:00" },
  { "branch": { "id": branch1['id'] }, "dayOfWeek": "THURSDAY", "availableTime": "12:00:00" },
  { "branch": { "id": branch1['id'] }, "dayOfWeek": "THURSDAY", "availableTime": "12:30:00" },
  { "branch": { "id": branch1['id'] }, "dayOfWeek": "THURSDAY", "availableTime": "13:00:00" },
  { "branch": { "id": branch1['id'] }, "dayOfWeek": "THURSDAY", "availableTime": "13:30:00" },
  { "branch": { "id": branch1['id'] }, "dayOfWeek": "THURSDAY", "availableTime": "14:00:00" },
  { "branch": { "id": branch1['id'] }, "dayOfWeek": "THURSDAY", "availableTime": "14:30:00" },
  { "branch": { "id": branch1['id'] }, "dayOfWeek": "THURSDAY", "availableTime": "15:00:00" },

  #Friday
  { "branch": { "id": branch1['id'] }, "dayOfWeek": "FRIDAY", "availableTime": "09:00:00" },
  { "branch": { "id": branch1['id'] }, "dayOfWeek": "FRIDAY", "availableTime": "09:30:00" },
  { "branch": { "id": branch1['id'] }, "dayOfWeek": "FRIDAY", "availableTime": "10:00:00" },
  { "branch": { "id": branch1['id'] }, "dayOfWeek": "FRIDAY", "availableTime": "10:30:00" },
  { "branch": { "id": branch1['id'] }, "dayOfWeek": "FRIDAY", "availableTime": "11:00:00" },
  { "branch": { "id": branch1['id'] }, "dayOfWeek": "FRIDAY", "availableTime": "11:30:00" },
  { "branch": { "id": branch1['id'] }, "dayOfWeek": "FRIDAY", "availableTime": "12:00:00" },
  { "branch": { "id": branch1['id'] }, "dayOfWeek": "FRIDAY", "availableTime": "12:30:00" },
  { "branch": { "id": branch1['id'] }, "dayOfWeek": "FRIDAY", "availableTime": "13:00:00" },
  { "branch": { "id": branch1['id'] }, "dayOfWeek": "FRIDAY", "availableTime": "13:30:00" },
  { "branch": { "id": branch1['id'] }, "dayOfWeek": "FRIDAY", "availableTime": "14:00:00" },
  { "branch": { "id": branch1['id'] }, "dayOfWeek": "FRIDAY", "availableTime": "14:30:00" },
  { "branch": { "id": branch1['id'] }, "dayOfWeek": "FRIDAY", "availableTime": "15:00:00" },

  #West Branch

  #Monday
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "MONDAY", "availableTime": "10:00:00" },
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "MONDAY", "availableTime": "10:30:00" },
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "MONDAY", "availableTime": "11:00:00" },
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "MONDAY", "availableTime": "11:30:00" },
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "MONDAY", "availableTime": "12:00:00" },
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "MONDAY", "availableTime": "12:30:00" },
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "MONDAY", "availableTime": "13:00:00" },
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "MONDAY", "availableTime": "13:30:00" },
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "MONDAY", "availableTime": "14:00:00" },
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "MONDAY", "availableTime": "14:30:00" },
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "MONDAY", "availableTime": "15:00:00" },
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "MONDAY", "availableTime": "15:30:00" },
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "MONDAY", "availableTime": "16:00:00" },

  #Tuesday
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "TUESDAY", "availableTime": "10:00:00" },
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "TUESDAY", "availableTime": "10:30:00" },
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "TUESDAY", "availableTime": "11:00:00" },
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "TUESDAY", "availableTime": "11:30:00" },
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "TUESDAY", "availableTime": "12:00:00" },
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "TUESDAY", "availableTime": "12:30:00" },
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "TUESDAY", "availableTime": "13:00:00" },
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "TUESDAY", "availableTime": "13:30:00" },
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "TUESDAY", "availableTime": "14:00:00" },
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "TUESDAY", "availableTime": "14:30:00" },
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "TUESDAY", "availableTime": "15:00:00" },
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "TUESDAY", "availableTime": "15:30:00" },
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "TUESDAY", "availableTime": "16:00:00" },

  #Wednesday
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "WEDNESDAY", "availableTime": "10:00:00" },
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "WEDNESDAY", "availableTime": "10:30:00" },
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "WEDNESDAY", "availableTime": "11:00:00" },
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "WEDNESDAY", "availableTime": "11:30:00" },
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "WEDNESDAY", "availableTime": "12:00:00" },
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "WEDNESDAY", "availableTime": "12:30:00" },
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "WEDNESDAY", "availableTime": "13:00:00" },
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "WEDNESDAY", "availableTime": "13:30:00" },
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "WEDNESDAY", "availableTime": "14:00:00" },
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "WEDNESDAY", "availableTime": "14:30:00" },
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "WEDNESDAY", "availableTime": "15:00:00" },
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "WEDNESDAY", "availableTime": "15:30:00" },
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "WEDNESDAY", "availableTime": "16:00:00" },

  #Thursday
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "THURSDAY", "availableTime": "10:00:00" },
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "THURSDAY", "availableTime": "10:30:00" },
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "THURSDAY", "availableTime": "11:00:00" },
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "THURSDAY", "availableTime": "11:30:00" },
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "THURSDAY", "availableTime": "12:00:00" },
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "THURSDAY", "availableTime": "12:30:00" },
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "THURSDAY", "availableTime": "13:00:00" },
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "THURSDAY", "availableTime": "13:30:00" },
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "THURSDAY", "availableTime": "14:00:00" },
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "THURSDAY", "availableTime": "14:30:00" },
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "THURSDAY", "availableTime": "15:00:00" },
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "THURSDAY", "availableTime": "15:30:00" },
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "THURSDAY", "availableTime": "16:00:00" },

  #Friday
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "FRIDAY", "availableTime": "10:00:00" },
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "FRIDAY", "availableTime": "10:30:00" },
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "FRIDAY", "availableTime": "11:00:00" },
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "FRIDAY", "availableTime": "11:30:00" },
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "FRIDAY", "availableTime": "12:00:00" },
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "FRIDAY", "availableTime": "12:30:00" },
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "FRIDAY", "availableTime": "13:00:00" },
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "FRIDAY", "availableTime": "13:30:00" },
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "FRIDAY", "availableTime": "14:00:00" },
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "FRIDAY", "availableTime": "14:30:00" },
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "FRIDAY", "availableTime": "15:00:00" },
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "FRIDAY", "availableTime": "15:30:00" },
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "FRIDAY", "availableTime": "16:00:00" },

  #Saturday
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "SATURDAY", "availableTime": "12:00:00" },
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "SATURDAY", "availableTime": "12:30:00" },
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "SATURDAY", "availableTime": "13:00:00" },
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "SATURDAY", "availableTime": "13:30:00" },
  { "branch": { "id": branch2['id'] }, "dayOfWeek": "SATURDAY", "availableTime": "14:00:00" },

  #North Branch

  #Monday
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "MONDAY", "availableTime": "10:00:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "MONDAY", "availableTime": "10:30:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "MONDAY", "availableTime": "11:00:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "MONDAY", "availableTime": "11:30:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "MONDAY", "availableTime": "12:00:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "MONDAY", "availableTime": "12:30:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "MONDAY", "availableTime": "13:00:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "MONDAY", "availableTime": "13:30:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "MONDAY", "availableTime": "14:00:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "MONDAY", "availableTime": "14:30:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "MONDAY", "availableTime": "15:00:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "MONDAY", "availableTime": "15:30:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "MONDAY", "availableTime": "16:00:00" },

  #Tuesday
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "TUESDAY", "availableTime": "10:00:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "TUESDAY", "availableTime": "10:30:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "TUESDAY", "availableTime": "11:00:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "TUESDAY", "availableTime": "11:30:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "TUESDAY", "availableTime": "12:00:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "TUESDAY", "availableTime": "12:30:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "TUESDAY", "availableTime": "13:00:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "TUESDAY", "availableTime": "13:30:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "TUESDAY", "availableTime": "14:00:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "TUESDAY", "availableTime": "14:30:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "TUESDAY", "availableTime": "15:00:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "TUESDAY", "availableTime": "15:30:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "TUESDAY", "availableTime": "16:00:00" },

  #Wednesday
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "WEDNESDAY", "availableTime": "10:00:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "WEDNESDAY", "availableTime": "10:30:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "WEDNESDAY", "availableTime": "11:00:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "WEDNESDAY", "availableTime": "11:30:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "WEDNESDAY", "availableTime": "12:00:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "WEDNESDAY", "availableTime": "12:30:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "WEDNESDAY", "availableTime": "13:00:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "WEDNESDAY", "availableTime": "13:30:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "WEDNESDAY", "availableTime": "14:00:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "WEDNESDAY", "availableTime": "14:30:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "WEDNESDAY", "availableTime": "15:00:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "WEDNESDAY", "availableTime": "15:30:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "WEDNESDAY", "availableTime": "16:00:00" },

  #Thursday
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "THURSDAY", "availableTime": "10:00:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "THURSDAY", "availableTime": "10:30:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "THURSDAY", "availableTime": "11:00:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "THURSDAY", "availableTime": "11:30:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "THURSDAY", "availableTime": "12:00:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "THURSDAY", "availableTime": "12:30:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "THURSDAY", "availableTime": "13:00:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "THURSDAY", "availableTime": "13:30:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "THURSDAY", "availableTime": "14:00:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "THURSDAY", "availableTime": "14:30:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "THURSDAY", "availableTime": "15:00:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "THURSDAY", "availableTime": "15:30:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "THURSDAY", "availableTime": "16:00:00" },

  #Friday
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "FRIDAY", "availableTime": "10:00:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "FRIDAY", "availableTime": "10:30:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "FRIDAY", "availableTime": "11:00:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "FRIDAY", "availableTime": "11:30:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "FRIDAY", "availableTime": "12:00:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "FRIDAY", "availableTime": "12:30:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "FRIDAY", "availableTime": "13:00:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "FRIDAY", "availableTime": "13:30:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "FRIDAY", "availableTime": "14:00:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "FRIDAY", "availableTime": "14:30:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "FRIDAY", "availableTime": "15:00:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "FRIDAY", "availableTime": "15:30:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "FRIDAY", "availableTime": "16:00:00" },

  #Saturday
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "SATURDAY", "availableTime": "12:00:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "SATURDAY", "availableTime": "12:30:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "SATURDAY", "availableTime": "13:00:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "SATURDAY", "availableTime": "13:30:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "SATURDAY", "availableTime": "14:00:00" },

  #Sunday
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "SUNDAY", "availableTime": "12:00:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "SUNDAY", "availableTime": "12:30:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "SUNDAY", "availableTime": "13:00:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "SUNDAY", "availableTime": "13:30:00" },
  { "branch": { "id": branch3['id'] }, "dayOfWeek": "SUNDAY", "availableTime": "14:00:00" },


  #South Branch

  #Monday
  { "branch": { "id": branch4['id'] }, "dayOfWeek": "MONDAY", "availableTime": "11:00:00" },
  { "branch": { "id": branch4['id'] }, "dayOfWeek": "MONDAY", "availableTime": "11:30:00" },
  { "branch": { "id": branch4['id'] }, "dayOfWeek": "MONDAY", "availableTime": "12:00:00" },
  { "branch": { "id": branch4['id'] }, "dayOfWeek": "MONDAY", "availableTime": "12:30:00" },
  { "branch": { "id": branch4['id'] }, "dayOfWeek": "MONDAY", "availableTime": "13:00:00" },
  { "branch": { "id": branch4['id'] }, "dayOfWeek": "MONDAY", "availableTime": "13:30:00" },
  { "branch": { "id": branch4['id'] }, "dayOfWeek": "MONDAY", "availableTime": "14:00:00" },
  { "branch": { "id": branch4['id'] }, "dayOfWeek": "MONDAY", "availableTime": "14:30:00" },
  { "branch": { "id": branch4['id'] }, "dayOfWeek": "MONDAY", "availableTime": "15:00:00" },
  { "branch": { "id": branch4['id'] }, "dayOfWeek": "MONDAY", "availableTime": "15:30:00" },
  { "branch": { "id": branch4['id'] }, "dayOfWeek": "MONDAY", "availableTime": "16:00:00" },

  #Tuesday
  { "branch": { "id": branch4['id'] }, "dayOfWeek": "TUESDAY", "availableTime": "11:00:00" },
  { "branch": { "id": branch4['id'] }, "dayOfWeek": "TUESDAY", "availableTime": "11:30:00" },
  { "branch": { "id": branch4['id'] }, "dayOfWeek": "TUESDAY", "availableTime": "12:00:00" },
  { "branch": { "id": branch4['id'] }, "dayOfWeek": "TUESDAY", "availableTime": "12:30:00" },
  { "branch": { "id": branch4['id'] }, "dayOfWeek": "TUESDAY", "availableTime": "13:00:00" },
  { "branch": { "id": branch4['id'] }, "dayOfWeek": "TUESDAY", "availableTime": "13:30:00" },
  { "branch": { "id": branch4['id'] }, "dayOfWeek": "TUESDAY", "availableTime": "14:00:00" },
  { "branch": { "id": branch4['id'] }, "dayOfWeek": "TUESDAY", "availableTime": "14:30:00" },
  { "branch": { "id": branch4['id'] }, "dayOfWeek": "TUESDAY", "availableTime": "15:00:00" },
  { "branch": { "id": branch4['id'] }, "dayOfWeek": "TUESDAY", "availableTime": "15:30:00" },
  { "branch": { "id": branch4['id'] }, "dayOfWeek": "TUESDAY", "availableTime": "16:00:00" },

  #Wednesday
  { "branch": { "id": branch4['id'] }, "dayOfWeek": "WEDNESDAY", "availableTime": "11:00:00" },
  { "branch": { "id": branch4['id'] }, "dayOfWeek": "WEDNESDAY", "availableTime": "11:30:00" },
  { "branch": { "id": branch4['id'] }, "dayOfWeek": "WEDNESDAY", "availableTime": "12:00:00" },
  { "branch": { "id": branch4['id'] }, "dayOfWeek": "WEDNESDAY", "availableTime": "12:30:00" },
  { "branch": { "id": branch4['id'] }, "dayOfWeek": "WEDNESDAY", "availableTime": "13:00:00" },
  { "branch": { "id": branch4['id'] }, "dayOfWeek": "WEDNESDAY", "availableTime": "13:30:00" },
  { "branch": { "id": branch4['id'] }, "dayOfWeek": "WEDNESDAY", "availableTime": "14:00:00" },
  { "branch": { "id": branch4['id'] }, "dayOfWeek": "WEDNESDAY", "availableTime": "14:30:00" },
  { "branch": { "id": branch4['id'] }, "dayOfWeek": "WEDNESDAY", "availableTime": "15:00:00" },
  { "branch": { "id": branch4['id'] }, "dayOfWeek": "WEDNESDAY", "availableTime": "15:30:00" },
  { "branch": { "id": branch4['id'] }, "dayOfWeek": "WEDNESDAY", "availableTime": "16:00:00" },

  #Thursday
  { "branch": { "id": branch4['id'] }, "dayOfWeek": "THURSDAY", "availableTime": "11:00:00" },
  { "branch": { "id": branch4['id'] }, "dayOfWeek": "THURSDAY", "availableTime": "11:30:00" },
  { "branch": { "id": branch4['id'] }, "dayOfWeek": "THURSDAY", "availableTime": "12:00:00" },
  { "branch": { "id": branch4['id'] }, "dayOfWeek": "THURSDAY", "availableTime": "12:30:00" },
  { "branch": { "id": branch4['id'] }, "dayOfWeek": "THURSDAY", "availableTime": "13:00:00" },
  { "branch": { "id": branch4['id'] }, "dayOfWeek": "THURSDAY", "availableTime": "13:30:00" },
  { "branch": { "id": branch4['id'] }, "dayOfWeek": "THURSDAY", "availableTime": "14:00:00" },
  { "branch": { "id": branch4['id'] }, "dayOfWeek": "THURSDAY", "availableTime": "14:30:00" },
  { "branch": { "id": branch4['id'] }, "dayOfWeek": "THURSDAY", "availableTime": "15:00:00" },
  { "branch": { "id": branch4['id'] }, "dayOfWeek": "THURSDAY", "availableTime": "15:30:00" },
  { "branch": { "id": branch4['id'] }, "dayOfWeek": "THURSDAY", "availableTime": "16:00:00" },

  #Friday
  { "branch": { "id": branch4['id'] }, "dayOfWeek": "FRIDAY", "availableTime": "11:00:00" },
  { "branch": { "id": branch4['id'] }, "dayOfWeek": "FRIDAY", "availableTime": "11:30:00" },
  { "branch": { "id": branch4['id'] }, "dayOfWeek": "FRIDAY", "availableTime": "12:00:00" },
  { "branch": { "id": branch4['id'] }, "dayOfWeek": "FRIDAY", "availableTime": "12:30:00" },
  { "branch": { "id": branch4['id'] }, "dayOfWeek": "FRIDAY", "availableTime": "13:00:00" },
  { "branch": { "id": branch4['id'] }, "dayOfWeek": "FRIDAY", "availableTime": "13:30:00" },
  { "branch": { "id": branch4['id'] }, "dayOfWeek": "FRIDAY", "availableTime": "14:00:00" },
  { "branch": { "id": branch4['id'] }, "dayOfWeek": "FRIDAY", "availableTime": "14:30:00" },
  { "branch": { "id": branch4['id'] }, "dayOfWeek": "FRIDAY", "availableTime": "15:00:00" }
])

print("Script completed successfully!")
