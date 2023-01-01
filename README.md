# election-server

# Election
POST http://localhost:4000/admin/new-election
{
    "electionName":"test election current",
    "electionDec":"new election current decription",
    "voteStart":"2022-12-20",
    "voteEnd":"2023-01-10",
    "state":"maha"
}

DELETE dele-election/<electionID>



# create cand
POST http://localhost:4000/admin/new-cand
{
    "name":"cand 1",
    "email":"cand1@email.com",
    "contact":"0123456789",
    "party":"Part q"
}

# Generate Genises block
GET http://localhost:4000/admin/gen-genblock/<electionID>

## Let voters signup


# Register Voters to election
GET http://localhost:4000/admin/reg-voter/<electionID>


---------------Some Statics-----------------

# Get all Election
http://localhost:4000/public/all-election


# Get all Blocks
http://localhost:4000/public/get-blocks

http://localhost:4000/public/get-blocks/<electionID>

