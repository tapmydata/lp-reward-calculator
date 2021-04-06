h1. LP Reward Allocation

This is a simple script to work out pool allocation of rewards.

E.g. pay out a pro-rata allocation based on time and share of pool.

Steps:

1. Obtain the Uni v2 token export. For TAP this is https://etherscan.io/token/0x54049236fc1db3e274128176efedf7c69b4c6335

Note. You must extract from the beginning of time if you want to reward to users already in the pool.

2. Import this in to a local mysql database (see tables.sql for structure). Ignore datatime field, you don't need it.

3. Remove burns from the dataset with (replace 0x540 address with the token address in question as above):

```sql
Delete from
Trans
Where trans.from = '0x54049236fc1db3e274128176efedf7c69b4c6335' and trans.to = '0x0000000000000000000000000000000000000000'
```

4. Adjust removals of tokens to - amounts:

Note. 0x639e71d35d151ac4d0aafc7772354dae71ddc4f4 is our own LP account.

```sql
update trans
set quantity = quantity - (2*quantity)
where trans.to = '0x54049236fc1db3e274128176efedf7c69b4c6335'
or (trans.from != '0x0000000000000000000000000000000000000000' and not trans.to = '0x54049236fc1db3e274128176efedf7c69b4c6335')
and not trans.from = '0x639e71d35d151ac4d0aafc7772354dae71ddc4f4'
```

5. Update recipient details:

```sql
update trans
set trans.from = trans.to where trans.from = '0x0000000000000000000000000000000000000000'
```

6. Check and amend the reward and the date parameters in the script index.js

7. Run the script (need to install dependencies with npm install first):

```
node index.js
```

8. Extract the results:

```sql
select address, sum(amount)
from awards
group by address
order by address desc
```

TODO:

Steps 2 through 5 could easily be moved to the script.