pragma solidity ^0.4.0;

contract SpaCoin {
    int64 constant TOTAL_CIRCULATION = 100000 ;
    int64 outstanding_coins ;
    address owner ;
    mapping (address => int64) holdings ;
    
    function SpaCoin() {
        outstanding_coins = TOTAL_CIRCULATION ;
        owner = tx.origin ;
    }
    
    event CoinAllocation(address holder, int64 number, int64 remaining) ;
    event CoinMovement(address from, address to, int64 v) ;
    event InvalidCoinUsage(string reason) ;

    function getOwner()  returns(address) {
        return owner ;
    }

    function allocate(address newHolder, int64 value)  {
        if (tx.origin != owner) {
            InvalidCoinUsage('Only owner can allocate coins') ;
            return ;
        }
        if (value < 0) {
            InvalidCoinUsage('Cannot allocate negative value') ;
            return ;
        }

        if (value <= outstanding_coins) {
            holdings[newHolder] += value ;
            outstanding_coins -= value ;
            CoinAllocation(newHolder, value, outstanding_coins) ;
        } else {
            InvalidCoinUsage('value to allocate larger than outstanding coins') ;
        }
    }
    
    function move(address destination, int64 value)  {
        address source = tx.origin ;
        if (value <= 0) {
            InvalidCoinUsage('Must move value greater than zero') ;
            return ;
        }
        if (holdings[source] >= value) {
            holdings[destination] += value ;
            holdings[source] -= value ;
            CoinMovement(source, destination, value) ;
        } else {
            InvalidCoinUsage('value to move larger than holdings') ;
        }
    }
    
    function myBalance()  returns(int64) {
        return holdings[tx.origin] ;
    }
    
    function holderBalance(address holder)  returns(int64) {
        if (tx.origin != owner) return ;
        return holdings[holder] ;
    }

    function outstandingValue()  returns(int64) {
        if (tx.origin != owner) return ;
        return outstanding_coins ;
    }
    
}

