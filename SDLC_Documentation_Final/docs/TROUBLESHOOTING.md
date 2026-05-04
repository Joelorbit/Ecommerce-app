# Troubleshooting Guide

## 🔧 Issue Resolution Procedures

This guide provides systematic approaches to identify, diagnose, and resolve common issues in the e-commerce mobile application across all components.

---

## 1. Issue Classification & Priority

### Severity Levels

| Level        | Description                             | Response Time        | Examples                                       |
| ------------ | --------------------------------------- | -------------------- | ---------------------------------------------- |
| **Critical** | System down, data loss, security breach | Immediate (< 1 hour) | Payment processing failure, complete app crash |
| **High**     | Major functionality broken              | < 4 hours            | Login failure, checkout not working            |
| **Medium**   | Feature partially broken                | < 24 hours           | Slow performance, minor UI issues              |
| **Low**      | Cosmetic or minor issues                | < 72 hours           | Typos, styling inconsistencies                 |

### Issue Categories

- **🔐 Authentication Issues**
- **📱 Mobile App Problems**
- **🖥️ API/Backend Issues**
- **💾 Database Problems**
- **🔄 Real-time Sync Issues**
- **💳 Payment Processing**
- **📊 Performance Issues**
- **🔒 Security Concerns**

---

## 2. Authentication Issues

### User Cannot Login

#### Symptoms

- Login button unresponsive
- "Invalid credentials" error
- Password reset not working
- Account lockout

#### Diagnostic Steps

```bash
# 1. Check Supabase Auth service status
curl -X GET https://your-project.supabase.co/rest/v1/ \
  -H "apikey: your-anon-key"

# 2. Verify user exists in database
SELECT id, email, created_at FROM auth.users
WHERE email = 'user@example.com';

# 3. Check RLS policies
SELECT * FROM pg_policies WHERE tablename = 'profiles';
```

#### Common Solutions

**Invalid Credentials Error:**

```sql
-- Check if user account is confirmed
SELECT confirmed_at FROM auth.users WHERE email = 'user@example.com';

-- Reset password via Supabase dashboard if needed
-- Or use password reset API
```

**Account Lockout:**

```sql
-- Check failed login attempts (if tracking enabled)
SELECT * FROM auth.audit_log_entries
WHERE payload->>'email' = 'user@example.com'
ORDER BY created_at DESC LIMIT 5;
```

### JWT Token Issues

#### Symptoms

- User logged out unexpectedly
- API calls returning 401 errors
- Token expiration errors

#### Resolution Steps

```javascript
// Check token expiration in mobile app
const token = await AsyncStorage.getItem("auth_token");
if (token) {
  const decoded = jwt.decode(token);
  console.log("Token expires:", new Date(decoded.exp * 1000));
}

// Refresh token programmatically
const { data, error } = await supabase.auth.refreshSession();
```

---

## 3. Mobile App Issues

### App Crashes on Startup

#### iOS Crash Diagnosis

```bash
# Check device logs
xcrun simctl spawn booted log show --predicate 'process == "YourAppName"' --last 1h

# Check for Expo errors
npx expo install --fix
```

#### Android Crash Diagnosis

```bash
# Check Android logs
adb logcat | grep -i "yourappname"

# Clear app data and cache
adb shell pm clear com.yourcompany.yourapp
```

#### Common Crash Causes

- **Memory Issues:** Large images not optimized
- **Network Timeouts:** API calls without proper error handling
- **State Management:** Zustand store corruption
- **Platform-specific Code:** iOS/Android compatibility issues

### Slow Performance

#### Performance Profiling

```bash
# Use React DevTools for component profiling
npx react-devtools

# Check bundle size
npx expo bundle-analyzer

# Monitor network requests
# Use Flipper or Charles Proxy
```

#### Optimization Steps

1. **Image Optimization:**

   ```javascript
   // Use appropriate image sizes
   <Image
     source={{ uri: imageUrl }}
     style={{ width: 200, height: 200 }}
     resizeMode="cover"
   />
   ```

2. **List Virtualization:**

   ```javascript
   import { FlatList } from "react-native";

   <FlatList
     data={products}
     renderItem={renderProduct}
     keyExtractor={(item) => item.id}
     initialNumToRender={10}
     maxToRenderPerBatch={10}
     windowSize={10}
   />;
   ```

3. **Memoization:**

   ```javascript
   import React, { memo } from "react";

   const ProductItem = memo(({ product, onPress }) => {
     return (
       <TouchableOpacity onPress={onPress}>
         <Text>{product.name}</Text>
       </TouchableOpacity>
     );
   });
   ```

### Offline Functionality Issues

#### Cart Persistence Problems

```javascript
// Check AsyncStorage data
const cartData = await AsyncStorage.getItem("cart");
console.log("Cart data:", JSON.parse(cartData));

// Clear corrupted cart data
await AsyncStorage.removeItem("cart");
```

---

## 4. API & Backend Issues

### API Endpoint Failures

#### 500 Internal Server Error

```bash
# Check server logs
tail -f /var/log/application.log

# Test API connectivity
curl -X GET https://your-api-domain.com/health

# Check database connection
# In Node.js console
const { data, error } = await supabase.from('products').select('*').limit(1);
console.log('DB test:', { data, error });
```

#### 429 Rate Limit Exceeded

```javascript
// Implement exponential backoff
const delay = Math.pow(2, attempt) * 1000; // 1s, 2s, 4s...
await new Promise((resolve) => setTimeout(resolve, delay));

// Check rate limit headers
const response = await fetch("/api/products");
console.log(
  "Rate limit remaining:",
  response.headers.get("x-ratelimit-remaining"),
);
```

### Database Connection Issues

#### Connection Pool Exhaustion

```sql
-- Check active connections
SELECT count(*) FROM pg_stat_activity;

-- Monitor connection age
SELECT pid, usename, client_addr, backend_start, query_start, state
FROM pg_stat_activity
WHERE state = 'active';

-- Kill idle connections if needed
SELECT pg_terminate_backend(pid)
FROM pg_stat_activity
WHERE state = 'idle' AND now() - query_start > interval '5 minutes';
```

#### Query Performance Issues

```sql
-- Analyze slow queries
EXPLAIN ANALYZE SELECT * FROM products WHERE category = 'Electronics';

-- Check index usage
SELECT schemaname, tablename, indexname, idx_scan, idx_tup_read, idx_tup_fetch
FROM pg_stat_user_indexes
ORDER BY idx_scan DESC;

-- Add missing indexes
CREATE INDEX CONCURRENTLY idx_products_category ON products(category);
```

---

## 5. Real-time Sync Issues

### Live Updates Not Working

#### Supabase Realtime Diagnosis

```javascript
// Test real-time connection
const channel = supabase.channel("test");
channel.subscribe((status) => {
  console.log("Realtime status:", status);
});

// Check channel subscription
const { data, error } = await supabase.from("products").select("*").limit(1);

if (error) {
  console.error("Realtime setup error:", error);
}
```

#### WebSocket Connection Issues

```javascript
// Manual WebSocket test
const ws = new WebSocket("wss://your-project.supabase.co/realtime/v1");

ws.onopen = () => console.log("WebSocket connected");
ws.onmessage = (event) => console.log("Message:", event.data);
ws.onerror = (error) => console.error("WebSocket error:", error);

// Subscribe to changes
ws.send(
  JSON.stringify({
    event: "phx_join",
    topic: "realtime:public:products",
    payload: {},
    ref: "1",
  }),
);
```

### Sync Conflicts

#### Resolution Strategy

```javascript
// Implement conflict resolution
const handleRealtimeUpdate = (payload) => {
  const { eventType, new: newRecord, old: oldRecord } = payload;

  if (eventType === "INSERT") {
    // Handle new record
    updateLocalState(newRecord);
  } else if (eventType === "UPDATE") {
    // Handle updated record
    updateLocalState(newRecord);
  } else if (eventType === "DELETE") {
    // Handle deleted record
    removeFromLocalState(oldRecord.id);
  }
};
```

---

## 6. Payment Processing Issues

### Payment Failures

#### Stripe Payment Issues

```javascript
// Check payment intent status
const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
console.log("Payment status:", paymentIntent.status);

// Handle different failure reasons
switch (paymentIntent.last_payment_error?.code) {
  case "card_declined":
    // Handle card declined
    break;
  case "insufficient_funds":
    // Handle insufficient funds
    break;
  default:
    // Handle other errors
    break;
}
```

#### Common Payment Problems

- **Card Declined:** Check card validity and funds
- **Network Issues:** Retry with exponential backoff
- **Currency Mismatch:** Verify currency settings
- **Amount Limits:** Check payment provider limits

### Refund Processing

```javascript
// Process refund
const refund = await stripe.refunds.create({
  payment_intent: paymentIntentId,
  amount: refundAmount,
});

// Update order status in database
await supabase
  .from("orders")
  .update({ status: "refunded" })
  .eq("payment_intent_id", paymentIntentId);
```

---

## 7. Performance Issues

### Slow Loading Times

#### Frontend Performance

```javascript
// Use React.memo for component optimization
const ProductCard = React.memo(({ product }) => {
  return <View>...</View>;
});

// Implement lazy loading
const LazyProductList = lazy(() => import("./ProductList"));

// Optimize images
import { Image } from "expo-image";
<Image
  source={{ uri: product.image }}
  placeholder={blurhash}
  transition={300}
/>;
```

#### Backend Performance

```javascript
// Implement caching
const cache = new NodeCache({ stdTTL: 600 }); // 10 minutes

app.get("/api/products", async (req, res) => {
  const cacheKey = "products";
  const cached = cache.get(cacheKey);

  if (cached) {
    return res.json(cached);
  }

  const products = await getProductsFromDB();
  cache.set(cacheKey, products);
  res.json(products);
});
```

### Memory Leaks

#### Detection and Resolution

```javascript
// Use React DevTools Profiler
import { Profiler } from "react";

// Monitor component renders
<Profiler id="ProductList" onRender={onRenderCallback}>
  <ProductList />
</Profiler>;

// Clean up subscriptions
useEffect(() => {
  const subscription = supabase
    .channel("products")
    .on("postgres_changes", handleUpdate)
    .subscribe();

  return () => {
    subscription.unsubscribe();
  };
}, []);
```

---

## 8. Security Issues

### Data Exposure

#### RLS Policy Issues

```sql
-- Check existing policies
SELECT * FROM pg_policies WHERE schemaname = 'public';

-- Create proper RLS policies
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Products are viewable by everyone" ON products
  FOR SELECT USING (true);

CREATE POLICY "Products are editable by admins only" ON products
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );
```

#### API Key Exposure

```javascript
// Never expose API keys in client code
// Use environment variables on server
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// For client-side, use anon key only
const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### Authentication Bypass

#### JWT Validation

```javascript
// Validate JWT on protected routes
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};
```

---

## 9. Development Environment Issues

### Build Failures

#### Metro Bundler Issues

```bash
# Clear Metro cache
npx react-native start --reset-cache

# Clear node_modules and reinstall
rm -rf node_modules
npm install

# Clear Expo cache
npx expo install --fix
```

#### TypeScript Errors

```typescript
// Check tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}

// Fix common TypeScript issues
interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
}

const products: Product[] = await fetchProducts();
```

### Testing Issues

#### Jest Configuration

```javascript
// jest.config.js
module.exports = {
  preset: "react-native",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg))",
  ],
};
```

#### Detox Setup Issues

```bash
# Rebuild Detox
detox clean-framework-cache
detox build-framework-cache

# Run tests with verbose logging
detox test --loglevel verbose
```

---

## 10. Deployment Issues

### Environment Configuration

#### Missing Environment Variables

```bash
# Check required environment variables
REQUIRED_VARS=("SUPABASE_URL" "SUPABASE_ANON_KEY" "JWT_SECRET")

for var in "${REQUIRED_VARS[@]}"; do
  if [[ -z "${!var}" ]]; then
    echo "Error: $var is not set"
    exit 1
  fi
done
```

#### Database Migration Failures

```sql
-- Check migration status
SELECT * FROM supabase_migrations.schema_migrations
ORDER BY version DESC;

-- Rollback failed migration
-- Note: Requires careful planning
```

### CDN and Asset Issues

#### Image Loading Problems

```javascript
// Implement fallback for broken images
const [imageError, setImageError] = useState(false);

<Image
  source={{ uri: imageError ? fallbackImage : product.image }}
  onError={() => setImageError(true)}
/>;
```

---

## 11. Monitoring and Alerting

### Setting Up Monitoring

#### Application Monitoring

```javascript
// Sentry error tracking
import * as Sentry from "sentry-expo";

Sentry.init({
  dsn: "your-sentry-dsn",
  enableInExpoDevelopment: true,
  debug: true,
});
```

#### Performance Monitoring

```javascript
// Firebase Performance Monitoring
import performance from "@react-native-firebase/perf";

const trace = await performance().startTrace("product_list_load");
await fetchProducts();
trace.stop();
```

### Alert Configuration

#### Critical Alerts

- Application crashes
- Payment failures
- Database connection issues
- Security breaches

#### Warning Alerts

- High response times
- Increased error rates
- Low disk space
- Memory usage spikes

---

## 12. Emergency Procedures

### Service Outage Response

1. **Assess Impact**
   - Determine affected users and features
   - Check monitoring dashboards
   - Review error logs

2. **Communicate**
   - Update status page
   - Notify stakeholders
   - Provide estimated resolution time

3. **Mitigate**
   - Implement temporary workarounds
   - Scale resources if needed
   - Roll back recent changes

4. **Resolve**
   - Identify root cause
   - Apply fix
   - Test thoroughly

5. **Review**
   - Conduct post-mortem
   - Update documentation
   - Implement preventive measures

### Data Recovery

#### Backup Restoration

```bash
# Restore from backup
pg_restore -h localhost -U postgres -d ecommerce_db backup.sql

# Verify data integrity
SELECT count(*) FROM products;
SELECT count(*) FROM orders;
```

#### Point-in-Time Recovery

```sql
-- For Supabase, use their backup features
-- Or implement custom backup strategy
```

---

## 13. Prevention Best Practices

### Code Quality

- Implement comprehensive testing
- Use static analysis tools
- Follow coding standards
- Conduct code reviews

### Infrastructure

- Implement redundancy
- Use load balancing
- Monitor resource usage
- Plan capacity ahead

### Security

- Regular security audits
- Keep dependencies updated
- Implement least privilege
- Use secure coding practices

### Documentation

- Maintain runbooks
- Document known issues
- Update procedures regularly
- Train team members

---

_This troubleshooting guide provides comprehensive procedures for diagnosing and resolving issues in the e-commerce mobile application. Regular updates ensure it remains current with system changes._

## Quick Reference

### Emergency Contacts

- **Development Team:** dev@company.com
- **Infrastructure:** infra@company.com
- **Security:** security@company.com
- **Customer Support:** support@company.com

### Useful Commands

```bash
# Check app logs
npx expo install --fix

# Restart Metro bundler
npx react-native start --reset-cache

# Check database connectivity
npx supabase status

# View real-time logs
npx supabase logs
```
