// ...existing code...

# react-native-toast-next

Toast component for React Native.

## Installation

```sh
yarn add react-native-toast-next
# or
npm install react-native-toast-next
```

## Usage

Below are examples showing how to mount the Toast component, use the declarative API (props) and the programmatic API (static methods).

1. Mount a Toast instance in your app root (required for static methods to work):

```tsx
// Language: tsx
import React from 'react';
import { View } from 'react-native';
import Toast from 'react-native-toast-next';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      {/* your app UI */}
      <Toast />
    </View>
  );
}
```

2. Show / hide toasts programmatically:

```tsx
// Language: tsx
import Toast from 'react-native-toast-next';

// show a simple toast
Toast.show({ text: 'Hello world' });

// convenience methods
Toast.success('Saved successfully');
Toast.error('An error occurred');

// hide current toast
Toast.hide();
```

3. Customize behavior via props (type, position, visibilityTime, autoHide, etc.):

```tsx
// Language: tsx
import React from 'react';
import { View, Button } from 'react-native';
import Toast from 'react-native-toast-next';

export default function Example() {
  return (
    <View>
      <Button
        title="Show custom toast"
        onPress={() =>
          Toast.show({
            text: 'Short message, bottom position',
            position: 'bottom',
            visibilityTime: 2000,
            autoHide: true,
          })
        }
      />
      {/* You can also set defaults via props on the mounted Toast */}
      <Toast position="center" />
    </View>
  );
}
```

4. Add or override toast types via the `config` prop

Pass a `config` object to the mounted Toast to provide custom toast renderers. Each type is a function receiving runtime props (text, show, hide, props, etc.) and should return a React element.

```tsx
// Language: tsx
import React from 'react';
import { View, Text } from 'react-native';
import Toast from 'react-native-toast-next';

const customConfig = {
  myType: ({ text, show, hide, props }) => (
    <View style={{ padding: 12, backgroundColor: 'purple', borderRadius: 8 }}>
      <Text style={{ color: 'white' }}>{text}</Text>
    </View>
  ),
};

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <Toast config={customConfig} />
    </View>
  );
}

// usage:
Toast.show({ type: 'myType', text: 'Custom toast' });
```

## Types & Source

See the library source and type definitions for available props and hooks:

- Main entry: src/index.ts
- Toast wrapper: src/Toast.tsx
- Toast implementation: src/ToastComponent.tsx
- Types: src/types/index.tsx (e.g. ToastProps, ToastConfig)
- Built-in toast components:
  - src/components/success-toast/index.tsx
  - src/components/error-toast/index.tsx
  - src/components/base-toast/index.tsx

## Development

- Type check: yarn typecheck
- Run tests: yarn test

## License

MIT

---

Made with create-react-native-library
